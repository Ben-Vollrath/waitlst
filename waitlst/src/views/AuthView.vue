<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '../utils/supabase.ts'

import { cn } from '@/lib/utils'
import { PulseLoader } from '@/components/ui/pulse-loader'
import { ref } from 'vue'

const isLoading = ref(false)
const email = ref('')

const handleEmailLogin = async () => {
  try {
    isLoading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
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
  <div class="h-screen flex justify-center items-center">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Continue to sign up for free</CardTitle>
        <CardDescription>If you already have an account, we'll log you in. </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
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
      </CardContent>
    </Card>
  </div>
</template>
