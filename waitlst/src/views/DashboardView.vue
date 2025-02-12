<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import { watchEffect } from 'vue'
import DashboardContent from '@/components/DashboardContent.vue'
import { useWaitlistStore } from '@/stores/WaitListStore'

const authStore = useAuthStore()
const router = useRouter()

const waitlistStore = useWaitlistStore()

watchEffect(() => {
  if (!authStore.id) {
    router.push('/auth')
  } else {
    // Fetch waitlists when user is authenticated
    waitlistStore.fetchWaitlists()
  }
})
</script>

<template>
  <DashboardContent />
</template>
