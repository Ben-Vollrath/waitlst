<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/utils/supabase.ts'
import { PulseLoader } from '@/components/ui/pulse-loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const isLoading = ref(false)
const email = ref('')

const handleEmailLogin = async () => {
  try {
    isLoading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
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
  <form @submit.prevent="handleEmailLogin">
    <div class="grid gap-4">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          auto-capitalize="none"
          auto-complete="email"
          auto-correct="off"
          :disabled="isLoading"
          v-model="email"
        />
      </div>
      <Button type="submit" :disabled="isLoading">
        <template v-if="isLoading">
          <PulseLoader :loading="true" size="8px" margin="5px" color-class="bg-black" />
        </template>
        <template v-else> Sign In with Email </template>
      </Button>
    </div>
  </form>
</template>
