export interface Article {
  id: number
  title: string
  url: string
  source: string
  summary: string | null
  tags: string[] | null
  published_at: string
}
