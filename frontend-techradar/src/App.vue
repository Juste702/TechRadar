<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import TagFilter from './components/TagFilter.vue'

interface Article {
  id: number
  title: string
  url: string
  source: string
  summary: string | null
  tags: string[] | null
  published_at: string
}

const MAX_TAGS = 15

const articles = ref<Article[]>([])
const selectedTag = ref<string | null>(null)

// Tags triés par nombre d'articles, pour afficher les plus utiles en premier
const availableTags = computed(() => {
  const counts = new Map<string, number>()
  for (const article of articles.value) {
    for (const tag of article.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, MAX_TAGS)
    .map(([tag]) => tag)
})

const filteredArticles = computed(() => {
  const tag = selectedTag.value
  if (tag === null) return articles.value
  return articles.value.filter((article) => article.tags?.includes(tag))
})

onMounted(async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
  const data = await response.json()
  articles.value = data
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900 text-white">
    <AppHeader :article-count="filteredArticles.length" />

    <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
      <TagFilter v-if="availableTags.length" v-model="selectedTag" :tags="availableTags" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="bg-gray-800 rounded-lg p-5 flex flex-col justify-between border border-gray-700 hover:border-blue-500 transition-colors duration-200"
        >
          <div>
            <span
              class="inline-block text-xs uppercase tracking-wide text-blue-400 bg-blue-950 px-2 py-1 rounded mb-3"
            >
              {{ article.source }}
            </span>
            <h2 class="text-lg font-semibold mb-2 line-clamp-3">{{ article.title }}</h2>
            <p class="text-gray-400 text-sm">
              {{ article.summary ?? 'Résumé non disponible' }}
            </p>
            <ul v-if="article.tags?.length" class="flex flex-wrap gap-x-2 gap-y-1 mt-3">
              <li v-for="tag in article.tags" :key="tag" class="text-xs text-gray-500">
                #{{ tag }}
              </li>
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
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
