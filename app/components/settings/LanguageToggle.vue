<script setup lang="ts">
const { locale: current, setLocaleCookie, locales } = useI18n()
const router = useRouter()

const currentLocale = computed(() => {
  return locales.value.find(locale => locale.code === current.value)
})

const isChangingLocale = ref(false)

const switchLocalePath = useSwitchLocalePath()

async function changeLocale(localeCode: "en" | "hi") {
  isChangingLocale.value = true
  try {
    await setLocaleCookie(localeCode)
    const path = switchLocalePath(localeCode)
    if (path) {
      await router.push(path)
    }
  } catch (error) {
    console.error('Error changing locale:', error)
    // Fallback to default locale
    await setLocaleCookie('en')
  } finally {
    isChangingLocale.value = false
  }
}
</script>

<template>
  <div class="z-99 flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-900/90 px-3 py-1 backdrop-blur-xl">
    <ClientOnly>
      <template v-if="isChangingLocale">
        <ULoadingIcon />
      </template>
      <template v-else>
        <button
          v-for="locale in locales"
          :key="locale.code"
          class="cursor-pointer select-none"
          @click="changeLocale(locale.code)"
        >
          <span
            class="font-semibold"
            :class="locale.code === currentLocale?.code ? 'text-white' : 'text-neutral-500'"
          >
            {{ locale.code }}
          </span>
        </button>
      </template>
      <template #fallback>
        <div class="h-2 w-5" />
      </template>
    </ClientOnly>
  </div>
</template>
