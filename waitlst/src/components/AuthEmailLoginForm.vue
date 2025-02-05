<script setup lang="ts">
import { ref, watch } from 'vue'
import { supabase } from '@/utils/supabase.ts'
import { PulseLoader } from '@/components/ui/pulse-loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const isLoading = ref(false)
const email = ref('')
const emailError = ref('')

// Watch for changes in email input and clear error when user types
watch(email, () => {
  emailError.value = ''
})

const handleEmailLogin = async () => {
  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }

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
      emailError.value = error.message
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
          :class="emailError ? 'border-red-500 focus:border-red-500' : ''"
        />
        <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
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
