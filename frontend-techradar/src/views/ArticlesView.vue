<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TagFilter from '@/components/TagFilter.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton.vue'
import { useArticles } from '@/composables/useArticles'
import { useTags } from '@/composables/useTags'

const SKELETON_COUNT = 6

const route = useRoute()
const router = useRouter()

// L'URL est la source de vérité : /articles?tag=php est partageable et survit au rechargement
const selectedTag = computed<string | null>({
  get: () => {
    const tag = route.query.tag
    return typeof tag === 'string' && tag !== '' ? tag : null
  },
  set: (tag) => {
    // replace plutôt que push : changer de filtre n'empile pas d'entrées dans l'historique
    router.replace({ query: { ...route.query, tag: tag ?? undefined } })
  },
})
const { tags } = useTags()
const { articles, total, isLoading, isLoadingMore, error, hasMore, reload, loadMore } =
  useArticles(selectedTag)

const countLabel = computed(() => {
  if (isLoading.value) return 'Chargement…'
  return total.value > 1 ? `${total.value} articles` : `${total.value} article`
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-10">
    <div class="flex items-end justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Articles</h1>
        <p class="text-gray-400 text-sm mt-1">
          Les dernières publications, des plus récentes aux plus anciennes
        </p>
      </div>
      <span
        class="shrink-0 text-sm text-blue-400 bg-blue-950 border border-blue-900 px-3 py-1 rounded-full"
      >
        {{ countLabel }}
      </span>
    </div>

    <!-- Hors des états de chargement : les filtres restent visibles pendant un changement de tag -->
    <TagFilter v-if="tags.length" v-model="selectedTag" :tags="tags" />

    <div
      v-if="isLoading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="status"
      aria-label="Chargement des articles"
    >
      <ArticleCardSkeleton v-for="n in SKELETON_COUNT" :key="n" />
    </div>

    <div
      v-else-if="error && articles.length === 0"
      role="alert"
      class="max-w-md mx-auto text-center border border-red-900 bg-red-950/40 rounded-lg p-6"
    >
      <p class="text-red-300 mb-4">{{ error }}</p>
      <button
        type="button"
        class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-sm transition-colors duration-200"
        @click="reload"
      >
        Réessayer
      </button>
    </div>

    <p v-else-if="articles.length === 0" class="text-center text-gray-400">
      Aucun article pour le moment. Revenez après la prochaine synchronisation.
    </p>

    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>

      <div class="mt-10 flex flex-col items-center gap-3">
        <p v-if="error" role="alert" class="text-sm text-red-300">{{ error }}</p>
        <button
          v-if="hasMore"
          type="button"
          :disabled="isLoadingMore"
          class="px-5 py-2 rounded-full border border-blue-500 text-blue-400 text-sm hover:bg-blue-500 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
          @click="loadMore"
        >
          {{ isLoadingMore ? 'Chargement…' : 'Charger plus' }}
        </button>
        <p class="text-xs text-gray-500">{{ articles.length }} sur {{ total }}</p>
      </div>
    </template>
  </div>
</template>
