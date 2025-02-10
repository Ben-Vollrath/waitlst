<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.ts'
import { onMounted, watchEffect } from 'vue'
import DashboardContent from '@/components/DashboardContent.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  supabase.auth.signOut()
}

watchEffect(() => {
  if (!authStore.id) {
    router.push('/auth')
  }
})
</script>

<template>
  <DashboardContent />
</template>
