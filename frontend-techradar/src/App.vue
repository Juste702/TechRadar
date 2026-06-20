<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Article {
  id: number
  title: string
  url: string
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
  <h1>TechRadar</h1>
  <ul>
    <li v-for="article in articles" :key="article.id">
      <h2>{{ article.title }}</h2>
      <p>{{ article.summary ?? 'Résumé non disponible' }}</p>
      <a :href="article.url" target="_blank">Lire l'article</a>
    </li>
  </ul>
</template>
