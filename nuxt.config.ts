export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/scripts',
  ],

  imports: {
    presets: [
      {
        from: 'vue-sonner',
        imports: ['toast'],
      },
    ],
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/style/main.css'],

  site: {
    url: 'https://ravikant.dev',
    defaultLocale: 'en',
    indexable: true,
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  content: {
    renderer: {
      anchorLinks: false,
    },
    preview: {
      api: 'https://api.nuxt.studio',
      dev: true,
    },
  },

  mdc: {
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-dark',
        light: 'github-light',
      },
    },
  },

  runtimeConfig: {
    public: {
      available: process.env.NUXT_PUBLIC_AVAILABLE,
      meetingLink: process.env.NUXT_PUBLIC_MEETING_LINK,
    },
    private: {
      resendApiKey: process.env.NUXT_PRIVATE_RESEND_API_KEY,
    },
  },

  routeRules: {
    '/': { isr: true, prerender: true },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2025-01-05',

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/hi',
        '/about',
        '/hi/about',
        '/contact',
        '/hi/contact',
        '/works',
        '/hi/works',
        '/writing',
        '/hi/writing'
      ],
    },
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US' },
      { code: 'hi', name: 'हिंदी', language: 'hi-IN' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'en',
    },
    strategy: 'prefix',
    defaultLocale: 'en',
    baseUrl: '/',
    vueI18n: '~/i18n.config.ts',
    debug: process.env.NODE_ENV === 'production',
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: 'iconify',
  },

  ogImage: {
    zeroRuntime: true,
  },
})
