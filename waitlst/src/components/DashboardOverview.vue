<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
      <h1 class="text-lg font-semibold md:text-2xl">Waitlists</h1>
    </div>
    <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div class="flex flex-col items-center gap-1 text-center">
        <h3 class="text-2xl font-bold tracking-tight">You have no waitlists</h3>
        <p class="text-sm text-muted-foreground">Start by creating a new waitlist.</p>
        <Button class="mt-4"> Add Waitlist </Button>
      </div>
    </div>
  </main>
</template>
