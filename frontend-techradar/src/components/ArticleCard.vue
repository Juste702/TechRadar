<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from '@/i18n'
import type { Article } from '@/types/article'
import { formatFullDate, formatRelativeDate, languageName } from '@/utils/date'

const props = defineProps<{
  article: Article
}>()

const { t, locale } = useI18n()

const publishedAt = computed(() =>
  props.article.published_at ? new Date(props.article.published_at) : null,
)

// Traduction dans la langue du site, sauf si l'article est déjà dans cette langue
const translation = computed(() => {
  if (props.article.language === locale.value) return null
  return props.article.translations?.[locale.value as Locale] ?? null
})

const title = computed(() => translation.value?.title ?? props.article.title)
const summary = computed(() =>
  translation.value ? translation.value.summary : props.article.summary,
)
</script>

<template>
  <article
    class="bg-gray-800 rounded-lg p-5 flex flex-col justify-between border border-gray-700 hover:border-blue-500 transition-colors duration-200"
  >
    <div>
      <div class="flex items-center justify-between gap-2 mb-3">
        <span
          class="inline-block text-xs uppercase tracking-wide text-blue-400 bg-blue-950 px-2 py-1 rounded"
        >
          {{ article.source }}
        </span>
        <time
          v-if="publishedAt"
          :datetime="article.published_at ?? undefined"
          :title="formatFullDate(publishedAt, locale)"
          class="text-xs text-gray-500"
        >
          {{ formatRelativeDate(publishedAt, locale) }}
        </time>
      </div>
      <h2 class="text-lg font-semibold mb-2 line-clamp-3">{{ title }}</h2>
      <p class="text-gray-400 text-sm">
        {{ summary ?? t('article.noSummary') }}
      </p>
      <p v-if="translation && article.language" class="text-xs text-gray-500 italic mt-2">
        {{ t('article.machineTranslated', { language: languageName(article.language, locale) }) }}
      </p>
      <ul v-if="article.tags?.length" class="flex flex-wrap gap-x-2 gap-y-1 mt-3">
        <li v-for="tag in article.tags" :key="tag" class="text-xs text-gray-500">#{{ tag }}</li>
      </ul>
    </div>
    <a
      :href="article.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-400 text-sm mt-4 hover:underline"
    >
      {{ t('article.read') }}
    </a>
  </article>
</template>
