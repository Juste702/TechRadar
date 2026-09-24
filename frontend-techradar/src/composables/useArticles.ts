import { ref, computed, watch, onMounted, type Ref } from 'vue'
import type { Article, Paginated } from '@/types/article'

export function useArticles(tag: Ref<string | null>) {
  const articles = ref<Article[]>([])
  const total = ref(0)
  const currentPage = ref(0)
  const lastPage = ref(0)
  const isLoading = ref(true)
  const isLoadingMore = ref(false)
  const error = ref<string | null>(null)

  const hasMore = computed(() => currentPage.value < lastPage.value)

  // Permet d'annuler une requête devenue obsolète (ex. changement de tag en cours de chargement)
  let controller: AbortController | null = null

  async function fetchPage(page: number): Promise<Paginated<Article>> {
    controller?.abort()
    controller = new AbortController()

    const params = new URLSearchParams({ page: String(page) })
    if (tag.value) params.set('tag', tag.value)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles?${params}`, {
      signal: controller.signal,
    })
    // fetch ne rejette pas sur un 4xx/5xx : il faut vérifier le statut soi-même
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return response.json()
  }

  function applyPage(result: Paginated<Article>, append: boolean) {
    if (append) {
      // Si des articles ont été ajoutés entre deux pages, l'offset décale : on évite les doublons
      const seen = new Set(articles.value.map((article) => article.id))
      articles.value = [
        ...articles.value,
        ...result.data.filter((article) => !seen.has(article.id)),
      ]
    } else {
      articles.value = result.data
    }
    total.value = result.total
    currentPage.value = result.current_page
    lastPage.value = result.last_page
  }

  function isAbort(e: unknown) {
    return e instanceof DOMException && e.name === 'AbortError'
  }

  async function reload() {
    isLoading.value = true
    isLoadingMore.value = false
    error.value = null
    try {
      applyPage(await fetchPage(1), false)
      isLoading.value = false
    } catch (e) {
      // Requête remplacée par une plus récente : c'est elle qui mettra l'état à jour
      if (isAbort(e)) return
      console.error('Échec du chargement des articles', e)
      error.value = 'Impossible de charger les articles. Vérifiez que l’API est lancée.'
      isLoading.value = false
    }
  }

  async function loadMore() {
    if (!hasMore.value || isLoading.value || isLoadingMore.value) return
    isLoadingMore.value = true
    error.value = null
    try {
      applyPage(await fetchPage(currentPage.value + 1), true)
      isLoadingMore.value = false
    } catch (e) {
      if (isAbort(e)) return
      console.error('Échec du chargement de la page suivante', e)
      error.value = 'Impossible de charger plus d’articles.'
      isLoadingMore.value = false
    }
  }

  onMounted(reload)
  watch(tag, reload)

  return { articles, total, isLoading, isLoadingMore, error, hasMore, reload, loadMore }
}
