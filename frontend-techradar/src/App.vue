<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Article {
  id: number
  title: string
  url: string
  source: string
  summary: string | null
  published_at: string
}

const articles = ref<Article[]>([])

onMounted(async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
  const data = await response.json()
  articles.value = data
  console.log(data)
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white px-6 py-10">
    <h1 class="text-3xl font-bold mb-8">TechRadar</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-gray-800 rounded-lg p-5 flex flex-col justify-between border border-gray-700 hover:border-blue-500 transition-colors duration-200"
      >
        <div>
          <span class="inline-block text-xs uppercase tracking-wide text-blue-400 bg-blue-950 px-2 py-1 rounded mb-3">
            {{ article.source }}
          </span>
          <h2 class="text-lg font-semibold mb-2 line-clamp-3">{{ article.title }}</h2>
          <p class="text-gray-400 text-sm">
            {{ article.summary ?? 'Résumé non disponible' }}
          </p>
        </div>
        <a
          :href="article.url"
          target="_blank"
          class="text-blue-400 text-sm mt-4 hover:underline"
        >
          Lire l'article →
        </a>
      </div>
    </div>
  </div>
</template>
