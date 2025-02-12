<script setup lang="ts">
import { User, Home, Code, Settings } from 'lucide-vue-next'
import { useWaitlistStore } from '@/stores/WaitlistStore'
import { useRouter } from 'vue-router'

const waitlistStore = useWaitlistStore()
const router = useRouter()

// Navigate while keeping selected waitlist in URL
const navigateToSection = (section: string) => {
  if (!waitlistStore.selectedWaitlist) return

  if (section === '') {
    router.push(`/dashboard/${waitlistStore.selectedWaitlist}`)
  } else {
    router.push(`/dashboard/${section}/${waitlistStore.selectedWaitlist}`)
  }
}
</script>

<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <button
      @click="navigateToSection('')"
      class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <Home class="h-4 w-4" />
      Overview
    </button>

    <button
      @click="navigateToSection('subscribers')"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <User class="h-4 w-4" />
      Subscribers
    </button>

    <button
      @click="navigateToSection('code')"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <Code class="h-4 w-4" />
      Code
    </button>

    <button
      @click="navigateToSection('settings')"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <Settings class="h-4 w-4" />
      Settings
    </button>
  </nav>
</template>
