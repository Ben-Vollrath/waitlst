<script setup lang="ts">
import { ref } from 'vue'
import NavigationElements from '@/components/NavigationElements.vue'
import GitHubButton from '@/components/GitHubButton.vue'
import Button from '@/components/ui/button/Button.vue'
import NavigationFeaturesContent from '@/components/NavigationFeaturesContent.vue'

// State for mobile menu visibility
const isMenuOpen = ref(false)

// Toggle function
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div>
    <div
      class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2"
    >
      <!-- Left Section (Logo and Name) -->
      <div class="flex items-center gap-12">
        <a href="#" class="inline-block gap-2 flex items-center">
          <img src="@/assets/logo.svg" alt="Waitlst logo" class="h-12 w-12" />
          <h1 class="font-bold text-xl">Waitlst</h1>
        </a>
        <NavigationElements class="hidden md:flex" />
      </div>

      <!-- Desktop Navigation (Hidden on Mobile) -->
      <div class="hidden md:flex items-center gap-4">
        <GitHubButton />
        <Button size="sm">Coming Soon!</Button>
      </div>

      <!-- Mobile Menu Button (Burger Icon) -->
      <button @click="toggleMenu" class="md:hidden p-2 focus:outline-none">
        <svg
          v-if="!isMenuOpen"
          class="w-6 h-6 text-gray-800 dark:text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg
          v-else
          class="w-6 h-6 text-gray-800 dark:text-white"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu Dropdown -->
  <div
    v-if="isMenuOpen"
    class="md:hidden absolute top-16 left-0 w-full h-full shadow-lg border-t bg-background border-zinc-200 dark:border-zinc-800 p-4"
  >
    <div class="flex flex-col space-y-4">
      <div></div>
      <GitHubButton />
      <Button size="sm">Coming Soon!</Button>
      <NavigationFeaturesContent />
    </div>
  </div>
</template>
