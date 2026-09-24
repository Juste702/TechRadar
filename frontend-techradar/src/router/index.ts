import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'TechRadar — Votre veille tech centralisée' },
    },
    {
      path: '/articles',
      name: 'articles',
      // Chargée à la demande : la page d'accueil n'embarque pas le code des articles
      component: () => import('@/views/ArticlesView.vue'),
      meta: { title: 'Articles — TechRadar' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Seule la query change (ex. filtre par tag) : on reste où on est
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = (to.meta.title as string | undefined) ?? 'TechRadar'
})

export default router
