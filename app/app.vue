<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import * as locales from '@nuxt/ui/locale'
import { Analytics } from '@vercel/analytics/nuxt';

const { locale } = useI18n()

// Add title handling
useHead({
  titleTemplate: (title) => {
    return title ? `${title} | Ravikant Chauhan` : 'Ravikant Chauhan'
  }
})

// Global error handler
onErrorCaptured((err, instance, info) => {
  console.error('Captured error:', err, instance, info)
  return false // Prevent error from propagating
})
</script>

<template>
  <Html
    :lang="locale"
    class="font-geist text-[var(--ui-text)] transition-colors duration-300 selection:bg-white/60 selection:text-zinc-800"
  >
    <Body>
      <LayoutScrollToTop />
      <NuxtLayout>
        <UApp :locale="locales[locale]">
          <NuxtPage />
        </UApp>
      </NuxtLayout>
      <Toaster close-button />
      <Analytics />
      <DotPattern class="absolute inset-0 -z-10 size-full fill-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
    </Body>
  </Html>
</template>
