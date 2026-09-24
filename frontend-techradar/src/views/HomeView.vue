<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Les textes sont dans i18n/locales : ici on ne garde que l'ordre d'affichage
const features = ['aggregation', 'filters', 'translation'] as const
const steps = ['fetch', 'store', 'read'] as const
</script>

<template>
  <div class="max-w-7xl mx-auto px-6">
    <section class="py-20 md:py-28 text-center max-w-3xl mx-auto">
      <p class="text-sm uppercase tracking-widest text-blue-400 mb-4">{{ t('home.eyebrow') }}</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">
        {{ t('home.title') }} <span class="text-blue-500">{{ t('home.titleAccent') }}</span>
      </h1>
      <p class="text-lg text-gray-400 mb-10">{{ t('home.intro') }}</p>
      <RouterLink
        :to="{ name: 'articles' }"
        class="inline-block px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-medium transition-colors duration-200"
      >
        {{ t('home.cta') }}
      </RouterLink>
    </section>

    <section aria-labelledby="features-title" class="pb-20">
      <h2 id="features-title" class="sr-only">{{ t('home.featuresTitle') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature"
          class="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <h3 class="text-lg font-semibold mb-2">{{ t(`home.features.${feature}.title`) }}</h3>
          <p class="text-gray-400 text-sm">{{ t(`home.features.${feature}.description`) }}</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="how-title" class="pb-24 max-w-3xl mx-auto">
      <h2 id="how-title" class="text-2xl font-bold tracking-tight mb-8 text-center">
        {{ t('home.howTitle') }}
      </h2>
      <ol class="space-y-4">
        <li v-for="(step, index) in steps" :key="step" class="flex items-start gap-4">
          <span
            class="shrink-0 w-8 h-8 rounded-full bg-blue-950 border border-blue-900 text-blue-400 text-sm flex items-center justify-center"
          >
            {{ index + 1 }}
          </span>
          <p class="text-gray-300 pt-1">{{ t(`home.steps.${step}`) }}</p>
        </li>
      </ol>
    </section>
  </div>
</template>
