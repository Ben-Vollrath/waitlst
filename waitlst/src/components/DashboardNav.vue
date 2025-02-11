<script setup lang="ts">
import { User, Home, Code, Settings } from 'lucide-vue-next'
</script>

<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <a
      href="/dashboard"
      class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <Home class="h-4 w-4" />
      Overview
    </a>
    <a
      href="/dashboard"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <User class="h-4 w-4" />
      Subscribers
    </a>
    <a
      href="/dashboard"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <Code class="h-4 w-4" />
      Code
    </a>
    <a
      href="/dashboard"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <Settings class="h-4 w-4" />
      Settings
    </a>
  </nav>
</template>
