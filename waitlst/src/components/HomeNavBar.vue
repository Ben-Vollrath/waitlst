<script setup lang="ts">
import NavigationElements from '@/components/NavigationElements.vue'
import GitHubButton from '@/components/GitHubButton.vue'
import Button from '@/components/ui/button/Button.vue'
</script>

<template>
  <div class="grid gap-16 sm:gap-24 pb-16">
    <div>
      <div
        class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-800"
      >
        <div class="flex items-center gap-4">
          <Button variant="fullghost">
            <a href="#" class="inline-block">
              <img src="@/assets/logo.svg" alt="Waitlst logo" class="h-12 w-12" />
            </a>
            <h1 class="font-bold text-xl">Waitlst</h1>
          </Button>
          <NavigationElements />
        </div>
        <div class="flex items-center gap-4">
          <GitHubButton />
          <Button size="sm">Coming Soon!</Button>
        </div>
      </div>
    </div>
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-16 sm:gap-24"></div>
  </div>
</template>
