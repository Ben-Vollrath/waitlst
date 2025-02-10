<script setup lang="ts">
import { ClipboardList, LineChart } from 'lucide-vue-next'
</script>

<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <a
      href="/dashboard"
      class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <ClipboardList class="h-4 w-4" />
      Wait Lists
    </a>
    <a
      href="#"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <LineChart class="h-4 w-4" />
      Analytics
    </a>
  </nav>
</template>
