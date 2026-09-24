import { ref, onMounted } from 'vue'
import type { Tag } from '@/types/article'

export function useTags() {
  const tags = ref<Tag[]>([])

  onMounted(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tags`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      tags.value = await response.json()
    } catch (e) {
      // Pas bloquant : sans tags, on affiche simplement les articles sans filtres
      console.error('Échec du chargement des tags', e)
    }
  })

  return { tags }
}
