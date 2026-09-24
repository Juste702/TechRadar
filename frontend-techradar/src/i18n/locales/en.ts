import type fr from './fr'

// Typé sur le fichier français : une clé manquante ou en trop est une erreur de compilation
const en: typeof fr = {
  meta: {
    home: 'TechRadar — Your tech watch in one place',
    articles: 'Articles — TechRadar',
  },
  nav: {
    label: 'Main navigation',
    home: 'Home',
    articles: 'Articles',
    language: 'Language',
  },
  footer: {
    providedBy: 'Articles provided by',
  },
  home: {
    eyebrow: 'Tech watch aggregator',
    title: 'All your tech watch,',
    titleAccent: 'in one place',
    intro:
      'Instead of jumping from site to site, TechRadar gathers the latest articles from tech communities into a single, clear, filterable feed.',
    cta: 'Browse articles →',
    featuresTitle: 'Features',
    features: {
      aggregation: {
        title: 'Automatic aggregation',
        description:
          'Articles are fetched every hour from Dev.to, covering web, JavaScript, PHP, DevOps and AI.',
      },
      filters: {
        title: 'Tag filters',
        description:
          'Focus on what matters to you: one click on a tag keeps only the relevant articles.',
      },
      translation: {
        title: 'In English or French',
        description:
          'Titles and summaries are machine-translated: read your tech watch in the language you prefer.',
      },
    },
    howTitle: 'How it works',
    steps: {
      fetch: 'TechRadar polls tech sources on a regular schedule.',
      store: 'Articles are stored with their summary, tags and translation.',
      read: 'You browse the feed, filter by topic and open the original article.',
    },
  },
  articles: {
    title: 'Articles',
    subtitle: 'The latest posts, newest first',
    loading: 'Loading…',
    loadingAria: 'Loading articles',
    count: '{n} article | {n} articles',
    retry: 'Try again',
    empty: 'No articles yet. Check back after the next sync.',
    loadMore: 'Load more',
    progress: '{loaded} of {total}',
    errors: {
      load: 'Could not load articles. Make sure the API is running.',
      loadMore: 'Could not load more articles.',
    },
  },
  tags: {
    label: 'Filter by tag',
    all: 'All',
  },
  article: {
    read: 'Read the article →',
    noSummary: 'No summary available',
    machineTranslated: 'Machine-translated ({language})',
  },
}

export default en
