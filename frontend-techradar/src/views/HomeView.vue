<script setup lang="ts">
import { RouterLink } from 'vue-router'

const features = [
  {
    title: 'Agrégation automatique',
    description:
      'Les articles sont récupérés toutes les heures depuis Dev.to, sur les sujets web, JavaScript, PHP, DevOps et IA.',
  },
  {
    title: 'Filtres par tag',
    description:
      'Concentrez-vous sur ce qui vous intéresse : un clic sur un tag suffit pour ne garder que les articles concernés.',
  },
  {
    title: 'Toujours à jour',
    description:
      'Les publications sont triées de la plus récente à la plus ancienne, avec leur date et un résumé pour trier en un coup d’œil.',
  },
]

const steps = [
  'TechRadar interroge les sources tech à intervalle régulier.',
  'Les articles sont enregistrés avec leur résumé et leurs tags.',
  'Vous parcourez le flux, filtrez par sujet et ouvrez l’article d’origine.',
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-6">
    <section class="py-20 md:py-28 text-center max-w-3xl mx-auto">
      <p class="text-sm uppercase tracking-widest text-blue-400 mb-4">Agrégateur de veille tech</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">
        Toute votre veille tech, <span class="text-blue-500">au même endroit</span>
      </h1>
      <p class="text-lg text-gray-400 mb-10">
        Au lieu de passer d’un site à l’autre, TechRadar rassemble les derniers articles des
        communautés tech dans un flux unique, clair et filtrable.
      </p>
      <RouterLink
        :to="{ name: 'articles' }"
        class="inline-block px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-medium transition-colors duration-200"
      >
        Voir les articles →
      </RouterLink>
    </section>

    <section aria-labelledby="features-title" class="pb-20">
      <h2 id="features-title" class="sr-only">Fonctionnalités</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-gray-800 rounded-lg p-6 border border-gray-700"
        >
          <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-400 text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="how-title" class="pb-24 max-w-3xl mx-auto">
      <h2 id="how-title" class="text-2xl font-bold tracking-tight mb-8 text-center">
        Comment ça marche
      </h2>
      <ol class="space-y-4">
        <li v-for="(step, index) in steps" :key="step" class="flex items-start gap-4">
          <span
            class="shrink-0 w-8 h-8 rounded-full bg-blue-950 border border-blue-900 text-blue-400 text-sm flex items-center justify-center"
          >
            {{ index + 1 }}
          </span>
          <p class="text-gray-300 pt-1">{{ step }}</p>
        </li>
      </ol>
    </section>
  </div>
</template>
