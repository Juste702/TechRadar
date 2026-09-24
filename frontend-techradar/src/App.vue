<script setup lang="ts">
import { watchEffect } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const { t, locale } = useI18n()

// Se relance à chaque changement de page ou de langue
watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t(route.meta.titleKey ?? 'meta.home')
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900 text-white">
    <AppHeader />

    <main class="flex-1 w-full">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>
