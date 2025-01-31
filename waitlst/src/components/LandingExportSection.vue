<script setup lang="ts">
import { FileText, Clock, Database } from 'lucide-vue-next'
import LandingFeatureItem from '@/components/LandingFeatureItem.vue'
</script>

<template>
  <div id="export" class="scroll-mt-16 flex flex-col gap-4 w-full text-center">
    <h1 class="text-4xl font-semibold dark:text-white">Seamless Data Export</h1>
    <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg max-w-lg mx-auto">
      Take full control of your waitlist data. Export your user lists in multiple formats, including
      CSV, JSON, and Excel, making it easy to integrate with your existing tools and workflows.
    </p>
  </div>
  <div class="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 px-4">
    <LandingFeatureItem
      :icon="FileText"
      title="Multiple Formats"
      description="Export waitlist data in CSV, JSON, and Excel for easy integration."
    />
    <LandingFeatureItem
      :icon="Clock"
      title="Instant Access"
      description="Download your data in one click—no complex setup required."
    />
    <LandingFeatureItem
      :icon="Database"
      title="Sync with Your Tools"
      description="Seamlessly integrate with CRMs, analytics tools, and databases."
    />
  </div>
</template>
