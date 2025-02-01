<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale, localeProperties, t } = useI18n()
const router = useRouter()

// Destructure pending directly from useAsyncData
const { data: page, error, pending } = await useAsyncData(route.path, async () => {
  try {
    const collection = ('content_' + locale.value) as keyof Collections
    const content = await queryCollection(collection).path(route.path).first() as Collections['content_en'] | Collections['content_hi']
    
    if (!content) {
      // If content not found in current locale, try fallback to English
      if (locale.value !== 'en') {
        const enCollection = 'content_en' as keyof Collections
        const enContent = await queryCollection(enCollection).path(route.path.replace(`/${locale.value}/`, '/en/')).first()
        if (enContent) {
          // Optionally show a toast that we're using English content
          toast.info(t('global.using_english_content'))
          return enContent
        }
      }
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }
    
    return content
  } catch (e) {
    console.error('Error loading content:', e)
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }
}, {
  watch: [locale],
})

// Handle 404s gracefully
watch(error, (newError) => {
  if (newError?.statusCode === 404) {
    // Redirect to homepage of current locale
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
</script>

<template>
  <div>
    <ClientOnly>
      <!-- Show loading state -->
      <template v-if="pending">
        <div class="flex justify-center items-center min-h-screen">
          <ULoadingIcon />
        </div>
      </template>

      <!-- Show error state -->
      <template v-else-if="error">
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
