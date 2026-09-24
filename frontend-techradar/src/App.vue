<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import TagFilter from './components/TagFilter.vue'
import ArticleCard from './components/ArticleCard.vue'
import ArticleCardSkeleton from './components/ArticleCardSkeleton.vue'
import { useArticles } from './composables/useArticles'

const MAX_TAGS = 15
const SKELETON_COUNT = 6

const { articles, isLoading, error, reload } = useArticles()
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
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900 text-white">
    <AppHeader :article-count="filteredArticles.length" :is-loading="isLoading" />

    <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
      <div
        v-if="isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="status"
        aria-label="Chargement des articles"
      >
        <ArticleCardSkeleton v-for="n in SKELETON_COUNT" :key="n" />
      </div>

      <div
        v-else-if="error"
        role="alert"
        class="max-w-md mx-auto text-center border border-red-900 bg-red-950/40 rounded-lg p-6"
      >
        <p class="text-red-300 mb-4">{{ error }}</p>
        <button
          type="button"
          class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-sm transition-colors duration-200"
          @click="reload"
        >
          Réessayer
        </button>
      </div>

      <p v-else-if="articles.length === 0" class="text-center text-gray-400">
        Aucun article pour le moment. Revenez après la prochaine synchronisation.
      </p>

      <template v-else>
        <TagFilter v-if="availableTags.length" v-model="selectedTag" :tags="availableTags" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticleCard v-for="article in filteredArticles" :key="article.id" :article="article" />
        </div>
      </template>
    </main>

    <AppFooter />
  </div>
</template>
