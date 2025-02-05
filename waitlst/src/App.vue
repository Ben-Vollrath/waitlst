<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { Analytics } from '@vercel/analytics/vue'
import { useAuthStore } from '@/stores/AuthStore'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initializeAuth()
})
</script>

<template>
  <SpeedInsights />
  <Analytics />
  <RouterView />
</template>
