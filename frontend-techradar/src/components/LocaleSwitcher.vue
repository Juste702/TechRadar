<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES, saveLocale, type Locale } from '@/i18n'

const { t, locale } = useI18n()

function select(value: Locale) {
  locale.value = value
  saveLocale(value)
}
</script>

<template>
  <div
    role="group"
    :aria-label="t('nav.language')"
    class="flex rounded-full border border-gray-700 p-0.5 text-xs"
  >
    <button
      v-for="value in SUPPORTED_LOCALES"
      :key="value"
      type="button"
      :lang="value"
      :aria-pressed="locale === value"
      class="px-2.5 py-1 rounded-full uppercase transition-colors duration-200"
      :class="locale === value ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'"
      @click="select(value)"
    >
      {{ value }}
    </button>
  </div>
</template>
