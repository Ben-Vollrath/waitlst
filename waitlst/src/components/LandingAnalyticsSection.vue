<script setup lang="ts">
import LandingAnalyticsChart from '@/components/LandingAnalyticsChart.vue'
</script>

<template>
  <div id="analytics" class="scroll-mt-16 flex flex-col gap-4 w-full text-center">
    <h1 class="text-4xl font-semibold dark:text-white">Track, Optimize, and Grow</h1>
    <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg max-w-lg mx-auto">
      Gain real-time insights into your waitlist. Track user engagement, measure conversion rates,
      and optimize your onboarding strategy—all from a powerful, easy-to-use dashboard.
    </p>
  </div>
  <LandingAnalyticsChart />
</template>
