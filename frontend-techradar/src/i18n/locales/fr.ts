// Attention : dans les messages vue-i18n, { } @ $ | sont des caractères spéciaux
export default {
  meta: {
    home: 'TechRadar — Votre veille tech centralisée',
    articles: 'Articles — TechRadar',
  },
  nav: {
    label: 'Navigation principale',
    home: 'Accueil',
    articles: 'Articles',
    language: 'Langue',
  },
  footer: {
    providedBy: 'Articles fournis par',
  },
  home: {
    eyebrow: 'Agrégateur de veille tech',
    title: 'Toute votre veille tech,',
    titleAccent: 'au même endroit',
    intro:
      'Au lieu de passer d’un site à l’autre, TechRadar rassemble les derniers articles des communautés tech dans un flux unique, clair et filtrable.',
    cta: 'Voir les articles →',
    featuresTitle: 'Fonctionnalités',
    features: {
      aggregation: {
        title: 'Agrégation automatique',
        description:
          'Les articles sont récupérés toutes les heures depuis Dev.to, sur les sujets web, JavaScript, PHP, DevOps et IA.',
      },
      filters: {
        title: 'Filtres par tag',
        description:
          'Concentrez-vous sur ce qui vous intéresse : un clic sur un tag suffit pour ne garder que les articles concernés.',
      },
      translation: {
        title: 'En français ou en anglais',
        description:
          'Les titres et résumés sont traduits automatiquement : lisez votre veille dans la langue de votre choix.',
      },
    },
    howTitle: 'Comment ça marche',
    steps: {
      fetch: 'TechRadar interroge les sources tech à intervalle régulier.',
      store: 'Les articles sont enregistrés avec leur résumé, leurs tags et leur traduction.',
      read: 'Vous parcourez le flux, filtrez par sujet et ouvrez l’article d’origine.',
    },
  },
  articles: {
    title: 'Articles',
    subtitle: 'Les dernières publications, des plus récentes aux plus anciennes',
    loading: 'Chargement…',
    loadingAria: 'Chargement des articles',
    // Le français met le singulier pour 0 et 1 (voir pluralRules dans i18n/index.ts)
    count: '{n} article | {n} articles',
    retry: 'Réessayer',
    empty: 'Aucun article pour le moment. Revenez après la prochaine synchronisation.',
    loadMore: 'Charger plus',
    progress: '{loaded} sur {total}',
    errors: {
      load: 'Impossible de charger les articles. Vérifiez que l’API est lancée.',
      loadMore: 'Impossible de charger plus d’articles.',
    },
  },
  tags: {
    label: 'Filtrer par tag',
    all: 'Tous',
  },
  article: {
    read: 'Lire l’article →',
    noSummary: 'Résumé non disponible',
    machineTranslated: 'Traduction automatique ({language})',
  },
}
