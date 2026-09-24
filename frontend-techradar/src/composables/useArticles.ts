import { ref, onMounted } from 'vue'
import type { Article } from '@/types/article'

export function useArticles() {
  const articles = ref<Article[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  async function load() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
      // fetch ne rejette pas sur un 4xx/5xx : il faut vérifier le statut soi-même
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      articles.value = await response.json()
    } catch (e) {
      console.error('Échec du chargement des articles', e)
      error.value = 'Impossible de charger les articles. Vérifiez que l’API est lancée.'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(load)

  return { articles, isLoading, error, reload: load }
}
