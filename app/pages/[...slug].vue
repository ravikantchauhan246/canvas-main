<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale, localeProperties, t } = useI18n()
const router = useRouter()

// Keep track of whether we've shown the toast
const hasShownToast = ref(false)

const isChangingLocale = ref(false)

const { data: page, error, pending } = await useAsyncData(
  `content-${route.path}-${locale.value}`, // Add locale to key to force revalidation
  async () => {
    try {
      const collection = ('content_' + locale.value) as keyof Collections
      const content = await queryCollection(collection)
        .path(route.path)
        .first() as Collections['content_en'] | Collections['content_hi']
      
      if (!content) {
        // Try fallback to English
        if (locale.value !== 'en') {
          const enCollection = 'content_en' as keyof Collections
          const enPath = route.path.replace(`/${locale.value}/`, '/en/')
          const enContent = await queryCollection(enCollection).path(enPath).first()
          if (enContent) {
            // Only show toast once per session and only when actually falling back
            if (!hasShownToast.value) {
              toast.info(t('global.using_english_content'))
              hasShownToast.value = true
            }
            return enContent
          }
        }
        
        throw createError({ statusCode: 404, statusMessage: 'Page not found' })
      }
      
      // Reset toast flag when we successfully load non-English content
      hasShownToast.value = false
      return content
    } catch (e) {
      console.error('Error loading content:', e)
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }
  },
  {
    watch: [locale],
    // Remove or adjust getCachedData
    getCachedData: () => undefined
  }
)

// Handle 404s gracefully
watch(error, (newError) => {
  if (newError?.statusCode === 404) {
    router.push(useLocalePath()('/'))
  }
})

const { profile } = useAppConfig()
const { copy } = useClipboard()

defineShortcuts({
  meta_o: {
    usingInput: true,
    handler: () => {
      copy(profile.email!)
      toast.success(t('global.email_copied'))
    },
  },
})

watch(locale, () => {
  isChangingLocale.value = true
  setTimeout(() => {
    isChangingLocale.value = false
  }, 1000) // Reset after 1 second
})
</script>

<template>
  <div>
    <ClientOnly>
      <!-- Show loading state for both pending and 404 during locale change -->
      <template v-if="pending || (error?.statusCode === 404 && isChangingLocale)">
        <div class="flex justify-center items-center min-h-screen">
          <ULoadingIcon />
        </div>
      </template>

      <!-- Show error state only for non-404 errors -->
      <template v-else-if="error && error.statusCode !== 404">
        <div class="flex flex-col items-center justify-center min-h-screen">
          <h1 class="text-2xl font-bold mb-4">{{ error.statusMessage }}</h1>
          <UButton @click="router.push(useLocalePath()('/'))">
            {{ $t('global.back_to_home') }}
          </UButton>
        </div>
      </template>

      <!-- Show content -->
      <template v-else-if="page">
        <FolioMeta
          :page="page"
          :is-writing="route.path.includes('/articles/')"
        />
        <ContentRenderer
          :dir="localeProperties?.dir ?? 'ltr'"
          :value="page"
        />
      </template>
    </ClientOnly>
  </div>
</template>
