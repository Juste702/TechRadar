<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '@/types/article'
import { formatFullDate, formatRelativeDate } from '@/utils/date'

const props = defineProps<{
  article: Article
}>()

const publishedAt = computed(() =>
  props.article.published_at ? new Date(props.article.published_at) : null,
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
          :title="formatFullDate(publishedAt)"
          class="text-xs text-gray-500"
        >
          {{ formatRelativeDate(publishedAt) }}
        </time>
      </div>
      <h2 class="text-lg font-semibold mb-2 line-clamp-3">{{ article.title }}</h2>
      <p class="text-gray-400 text-sm">
        {{ article.summary ?? 'Résumé non disponible' }}
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
      Lire l'article →
    </a>
  </article>
</template>
