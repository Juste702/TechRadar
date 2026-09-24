import type { Locale } from '@/i18n'

export interface ArticleTranslation {
  title: string
  summary: string | null
}

export interface Article {
  id: number
  title: string
  url: string
  source: string
  summary: string | null
  tags: string[] | null
  /** Langue d'origine détectée par DeepL (null si pas encore traduit) */
  language: string | null
  /** Traductions vers les langues du site, sans la langue d'origine */
  translations: Partial<Record<Locale, ArticleTranslation>> | null
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
