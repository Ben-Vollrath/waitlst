<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/utils/supabase.ts'
import { useAuthStore } from '@/stores/AuthStore.ts'
import { useRouter } from 'vue-router'

import { PulseLoader } from '@/components/ui/pulse-loader'
import { onMounted, ref, watchEffect } from 'vue'

const isLoading = ref(false)
const email = ref('')

const router = useRouter()
const authStore = useAuthStore()

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

onMounted(async () => {
  if (authStore.id) {
    router.push('/dashboard')
  }
})

watchEffect(() => {
  if (authStore.id) {
    router.push('/dashboard')
  }
})
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Continue to sign up for free</CardTitle>
        <CardDescription>If you already have an account, we'll log you in. </CardDescription>
      </CardHeader>
      <CardContent>
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
            <div class="h-0.5 w-full bg-secondary"></div>
            <Button type="submit" :disabled="isLoading" variant="outline">
              <template v-if="isLoading">
                <PulseLoader :loading="true" size="8px" margin="5px" color-class="bg-white" />
              </template>
              <template v-else>
                <img src="@/assets/github-mark-white.svg" alt="GitHub Logo" class="h-4 w-4 mr-2" />
                Continue with GitHub
              </template>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
