<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/utils/supabase.ts'
import { PulseLoader } from '@/components/ui/pulse-loader'
import { Button } from '@/components/ui/button'

const isLoading = ref(false)

const signInWithGithub = async () => {
  try {
    isLoading.value = true
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Button type="button" @click="signInWithGithub" :disabled="isLoading" variant="outline">
    <template v-if="isLoading">
      <PulseLoader :loading="true" size="8px" margin="5px" color-class="bg-white" />
    </template>
    <template v-else>
      <img src="@/assets/github-mark-white.svg" alt="GitHub Logo" class="h-4 w-4 mr-2" />
      Continue with GitHub
    </template>
  </Button>
</template>
