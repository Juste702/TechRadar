import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    /** Clé i18n du titre de l'onglet */
    titleKey?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { titleKey: 'meta.home' },
    },
    {
      path: '/articles',
      name: 'articles',
      // Chargée à la demande : la page d'accueil n'embarque pas le code des articles
      component: () => import('@/views/ArticlesView.vue'),
      meta: { titleKey: 'meta.articles' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Seule la query change (ex. filtre par tag) : on reste où on est
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

export default router
