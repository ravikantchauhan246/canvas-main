import messages from '~/locales/messages'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages,
  fallbackLocale: 'en',
  missing: (locale, key) => {
    console.warn(`Missing translation: ${locale} ${key}`)
    return key
  },
  warnHtmlMessage: false,
  sync: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true
}))
