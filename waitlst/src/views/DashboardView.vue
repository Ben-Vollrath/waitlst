<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.ts'
import { computed, watchEffect } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  supabase.auth.signOut()
}

watchEffect(() => {
  if (!!authStore.id) router.push('/auth')
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Dashboard Coming Soon!</h1>
      <p class="mt-4 text-lg">Logged in as {{ authStore.email }}</p>
      <Button @click="handleLogout" class="mt-8">Log out</Button>
    </div>
  </div>
</template>
