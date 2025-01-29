<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: Object, // Icon component
  title: String, // Feature title
  description: String, // Feature description
})
</script>

<template>
  <div>
    <!-- Wrapper for Icon + Heading -->
    <div class="flex items-center gap-4">
      <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
        <component :is="icon" class="h-6 w-6 text-white" />
      </span>
      <h3 class="text-lg font-semibold leading-8 text-black dark:text-white">
        {{ title }}
      </h3>
    </div>
    <!-- Description Below Both -->
    <p class="mt-2 text-base leading-7 text-neutral-500 dark:text-neutral-400">
      {{ description }}
    </p>
  </div>
</template>
