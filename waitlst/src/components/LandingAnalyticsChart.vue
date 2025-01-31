<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

// Generate more realistic non-linear daily signups
const signupData = [
  { date: '2024-01-01', Google: 35, Reddit: 20 },
  { date: '2024-01-02', Google: 30, Reddit: 24 },
  { date: '2024-01-03', Google: 32, Reddit: 26 },
  { date: '2024-01-04', Google: 28, Reddit: 21 },
  { date: '2024-01-05', Google: 34, Reddit: 19 },
  { date: '2024-01-06', Google: 31, Reddit: 15 },
  { date: '2024-01-07', Google: 33, Reddit: 20 },
  { date: '2024-01-08', Google: 29, Reddit: 30 },
  { date: '2024-01-09', Google: 36, Reddit: 34 },
  { date: '2024-01-10', Google: 30, Reddit: 26 },
  { date: '2024-01-11', Google: 32, Reddit: 25 },
  { date: '2024-01-12', Google: 31, Reddit: 21 },
  { date: '2024-01-13', Google: 33, Reddit: 27 },
  { date: '2024-01-14', Google: 34, Reddit: 22 },
  { date: '2024-01-15', Google: 30, Reddit: 23 },
]
</script>
<template>
  <div
    class="relative w-full overflow-hidden max-w-4xl flex flex-col justify-center items-center mx-auto"
  >
    <LineChart
      :data="signupData"
      index="date"
      :categories="['Google', 'Reddit']"
      :y-formatter="(tick) => `${tick}`"
    />

    <!-- Description Text Below -->
    <p class="text-neutral-500 dark:text-neutral-400 text-center max-w-lg mx-auto">
      Daily sign-ups with source breakdown.
    </p>
  </div>
</template>
