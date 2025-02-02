import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    profile: group({
      title: 'Personal information',
      description: 'Personal information configuration',
      icon: 'lucide:user',
      fields: {
        name: field({
          type: 'string',
          title: 'Name',
          description: 'Your name.',
          icon: 'lucide:user',
          default: 'Ravikant Chauhan',
        }),
        job: field({
          type: 'string',
          title: 'Job',
          description: 'Your job.',
          icon: 'lucide:briefcase',
          default: 'Front-end developer',
        }),
        email: field({
          type: 'string',
          title: 'Email',
          description: 'Your email.',
          icon: 'lucide:mail',
          default: 'chauhan@ravikant.dev',
        }),
        phone: field({
          type: 'string',
          title: 'Phone',
          description: 'Your phone.',
          icon: 'lucide:phone',
          default: '+91 72766 05768',
        }),
        picture: field({
          type: 'string',
          title: 'Picture',
          description: 'Your picture.',
          icon: 'lucide:image',
          default: 'https://avatars.githubusercontent.com/u/53376708?v=4',
        }),
      },
    }),
    seo: group({
      title: 'SEO',
      description: 'SEO configuration',
      icon: 'lucide:search',
      fields: {
        title: field({
          type: 'string',
          title: 'Title',
          description: 'Title of your website (used in the preview of your website).',
          icon: 'lucide:title',
          default: 'My website',
        }),
        description: field({
          type: 'string',
          title: 'Description',
          description: 'Description of your website (used in the preview of your website).',
          icon: 'lucide:description',
          default: 'My website description',
        }),
        url: field({
          type: 'string',
          title: 'URL',
          description: 'Public URL of your website.',
          icon: 'lucide:link',
          default: 'https://ravikant.dev',
        }),
        lang: field({
          type: 'string',
          title: 'Language',
          description: 'The language that you want to use for your website.',
          icon: 'lucide:language',
          default: 'en',
          required: ['en', 'hi'],
        }),
      },
    }),
    socials: group({
      title: 'Socials',
      description: 'Socials configuration',
      icon: 'lucide:link',
      fields: {
        github: field({
          type: 'string',
          title: 'Github',
          description: 'Your Github account.',
          icon: 'lucide:github',
          default: 'https://github.com/ravikantchauhan246',
        }),
        twitter: field({
          type: 'string',
          title: 'Twitter',
          description: 'Your Twitter account.',
          icon: 'lucide:twitter',
          default: 'https://twitter.com/RavikantC2002',
        }),
        linkedin: field({
          type: 'string',
          title: 'Linkedin',
          description: 'Your Linkedin account.',
          icon: 'lucide:linkedin',
          default: 'https://www.linkedin.com/in/ravikantchauhan2002',
        }),
      },
    }),
  },
})
