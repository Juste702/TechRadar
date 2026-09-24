<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from './LocaleSwitcher.vue'

const { t } = useI18n()

// RouterLink pose aria-current="page" sur le lien actif : on s'en sert pour le style
const linkClass =
  'text-sm text-gray-400 hover:text-white aria-[current=page]:text-blue-400 transition-colors duration-200'
</script>

<template>
  <header class="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold tracking-tight">
        Tech<span class="text-blue-500">Radar</span>
      </RouterLink>
      <div class="flex items-center gap-6">
        <nav :aria-label="t('nav.label')" class="flex items-center gap-6">
          <RouterLink :to="{ name: 'home' }" :class="linkClass">{{ t('nav.home') }}</RouterLink>
          <RouterLink :to="{ name: 'articles' }" :class="linkClass">
            {{ t('nav.articles') }}
          </RouterLink>
        </nav>
        <LocaleSwitcher />
      </div>
    </div>
  </header>
</template>
