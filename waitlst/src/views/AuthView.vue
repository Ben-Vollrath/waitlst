<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/AuthStore.ts'
import { useRouter } from 'vue-router'
import { onMounted, watchEffect } from 'vue'
import EmailLoginForm from '@/components/AuthEmailLoginForm.vue'
import OAuthLoginButton from '@/components/AuthGitHubLogin.vue'

const router = useRouter()
const authStore = useAuthStore()

watchEffect(() => {
  if (authStore.id) router.push('/dashboard')
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
        <div class="flex flex-col gap-y-4">
          <EmailLoginForm />
          <div class="h-0.5 w-full bg-secondary"></div>
          <OAuthLoginButton />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
