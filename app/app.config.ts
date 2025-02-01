export default defineAppConfig({
  profile: {
    name: 'Ravikant Chauhan',
    job: '',
    email: 'ravikantchauhan246@gmail.com',
    phone: '+91 72766 05768',
    picture: 'https://avatars.githubusercontent.com/u/53376708?v=4',
  },
  socials: {
    github: 'https://github.com/ravikantchauhan246',
    twitter: 'https://twitter.com/RavikantC2002',
    linkedin: 'https://www.linkedin.com/in/ravikantchauhan2002',
    leetcode: 'https://leetcode.com/ravikant_chauhan/',
    
    
  },
  seo: {
    title: 'Ravikant Chauhan - Developer Portfolio',
    description: 'Aspiring Software Engineer with a passion for cloud technologies and building scalable solutions. Exploring the intersection of software development and cloud computing to create innovative solutions.',
    url: 'https://ravikant.dev'
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
