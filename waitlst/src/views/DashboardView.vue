<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import DashboardContent from '@/components/DashboardLayout.vue'
import { useWaitlistStore } from '@/stores/WaitlistStore'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const waitlistStore = useWaitlistStore()

watch(
  () => authStore.id,
  () => {
    if (!authStore.id) {
      router.push('/auth')
    } else {
      // Fetch waitlists when user is authenticated
      waitlistStore.fetchWaitlists()

      //Parse selected waitlist from route
      if (route.params.waitlistId) {
        waitlistStore.selectWaitlist(route.params.waitlistId as string)
      }
    }
  },
)
</script>

<template>
  <DashboardContent />
</template>
