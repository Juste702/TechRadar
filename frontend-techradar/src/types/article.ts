export interface Article {
  id: number
  title: string
  url: string
  source: string
  summary: string | null
  tags: string[] | null
  published_at: string | null
}

export interface Tag {
  name: string
  count: number
}

/** Sous-ensemble de la réponse de LengthAwarePaginator (Laravel) */
export interface Paginated<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
