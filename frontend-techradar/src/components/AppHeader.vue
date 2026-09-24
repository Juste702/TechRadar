<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  articleCount: number
}>()

const countLabel = computed(() =>
  props.articleCount > 1 ? `${props.articleCount} articles` : `${props.articleCount} article`,
)
</script>

<template>
  <header class="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-6 py-6 flex items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          Tech<span class="text-blue-500">Radar</span>
        </h1>
        <p class="text-gray-400 text-sm mt-1">Votre veille tech, centralisée au même endroit</p>
      </div>
      <span
        class="shrink-0 text-sm text-blue-400 bg-blue-950 border border-blue-900 px-3 py-1 rounded-full"
      >
        {{ countLabel }}
      </span>
    </div>
  </header>
</template>
