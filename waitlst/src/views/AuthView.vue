<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
          <Button type="submit" class="w-full">Login</Button>
          <div class="h-0.5 w-full bg-secondary"></div>
          <Button variant="outline" class="w-full">
            <img src="@/assets/github-mark-white.svg" alt="GitHub Logo" class="h-4 w-4 mr-2" />
            Continue with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
