<script setup lang="ts">
import NavigationElements from '@/components/NavigationElements.vue'
import GitHubButton from '@/components/GitHubButton.vue'
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <div class="flex items-center justify-around max-w-7xl mx-auto py-1">
    <div class="flex items-center space-x-0">
      <a href="#" class="inline-block">
        <img src="@/assets/logo.svg" alt="Waitlst logo" class="h-12 w-12" />
      </a>
      <h1 class="font-bold text-xl">Waitlst</h1>
    </div>
    <div>
      <NavigationElements />
    </div>
    <div class="flex space-x-4">
      <GitHubButton />
      <Button size="sm">Coming Soon!</Button>
    </div>
  </div>
</template>
