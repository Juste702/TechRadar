<script setup lang="ts">
defineProps<{
  tags: string[]
}>()

const selectedTag = defineModel<string | null>({ required: true })

const baseClass = 'px-3 py-1 rounded-full text-sm border transition-colors duration-200'
const activeClass = 'bg-blue-500 border-blue-500 text-white'
const inactiveClass = 'border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400'
</script>

<template>
  <nav aria-label="Filtrer par tag" class="flex flex-wrap gap-2 mb-8">
    <button
      type="button"
      :class="[baseClass, selectedTag === null ? activeClass : inactiveClass]"
      :aria-pressed="selectedTag === null"
      @click="selectedTag = null"
    >
      Tous
    </button>
    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      :class="[baseClass, selectedTag === tag ? activeClass : inactiveClass]"
      :aria-pressed="selectedTag === tag"
      @click="selectedTag = selectedTag === tag ? null : tag"
    >
      #{{ tag }}
    </button>
  </nav>
</template>
