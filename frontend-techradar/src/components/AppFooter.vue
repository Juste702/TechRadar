<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-gray-800">
    <div
      class="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500"
    >
      <p>
        Articles fournis par
        <a
          href="https://dev.to"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline"
        >
          Dev.to
        </a>
      </p>
      <p>
        © {{ currentYear }} TechRadar ·
        <a
          href="https://github.com/Juste702"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:underline"
        >
          @Juste702
        </a>
      </p>
    </div>
  </footer>
</template>
