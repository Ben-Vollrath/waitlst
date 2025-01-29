<script setup lang="ts">
import { BarChartIcon, DownloadIcon, LightningBoltIcon } from '@radix-icons/vue'
import Button from '@/components/ui/button/Button.vue'
import FeatureItem from '@/components/FeatureItem.vue'
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-16 sm:gap-24">
    <div class="grid items-center gap-8 sm:grid-cols-12">
      <div class="flex flex-col gap-4 sm:col-span-12">
        <h1 class="text-4xl font-semibold text-black dark:text-white">Waitlists for developers.</h1>
        <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg">
          Add a waitlist to your site in minutes — no hassle, just one API call.
        </p>
        <Button>Coming Soon!</Button>
      </div>
    </div>
    <div class="sm:col-span-7 sm:col-start-3 space-y-8">
      <FeatureItem
        :icon="LightningBoltIcon"
        title="Fast Implementation"
        description="Implement into your project in minutes."
      />
      <FeatureItem :icon="BarChartIcon" title="Analytics" description="Ready to go Analytics." />
      <FeatureItem
        :icon="DownloadIcon"
        title="Data Export"
        description="Export your Data and use it anywhere."
      />
    </div>
  </div>
</template>
