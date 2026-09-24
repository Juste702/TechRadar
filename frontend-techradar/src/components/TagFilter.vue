<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Tag } from '@/types/article'

defineProps<{
  tags: Tag[]
}>()

const { t } = useI18n()

const selectedTag = defineModel<string | null>({ required: true })

const baseClass = 'px-3 py-1 rounded-full text-sm border transition-colors duration-200'
const activeClass = 'bg-blue-500 border-blue-500 text-white'
const inactiveClass = 'border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400'
</script>

<template>
  <nav :aria-label="t('tags.label')" class="flex flex-wrap gap-2 mb-8">
    <button
      type="button"
      :class="[baseClass, selectedTag === null ? activeClass : inactiveClass]"
      :aria-pressed="selectedTag === null"
      @click="selectedTag = null"
    >
      {{ t('tags.all') }}
    </button>
    <button
      v-for="tag in tags"
      :key="tag.name"
      type="button"
      :class="[baseClass, selectedTag === tag.name ? activeClass : inactiveClass]"
      :aria-pressed="selectedTag === tag.name"
      @click="selectedTag = selectedTag === tag.name ? null : tag.name"
    >
      #{{ tag.name }}
      <span class="ml-1 opacity-60">{{ tag.count }}</span>
    </button>
  </nav>
</template>
