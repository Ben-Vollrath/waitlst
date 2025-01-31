<script setup lang="ts">
import { Zap, Download, ChartSpline } from 'lucide-vue-next'
import { Button } from '@/components/ui/button/'
import { Input } from '@/components/ui/input'
import LandingFeatureItem from '@/components/LandingFeatureItem.vue'
import LandingStepDisplay from '@/components/LandingStepDisplay.vue'
</script>

<template>
  <div
    class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 sm:gap-24"
  >
    <div id="main" class="scroll-mt-32 flex flex-col gap-4 max-w-lg text-center lg:text-left">
      <h1 class="text-4xl font-semibold dark:text-white">Waitlists for developers.</h1>
      <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg">
        Add a waitlist to your site in minutes — no hassle, just one API call.
      </p>

      <!-- "Broken" Email Signup -->
      <div class="relative w-full max-w-md">
        <Input type="email" placeholder="your@email.com" class="w-full" disabled />
        <Button
          class="absolute top-1/2 right-2 transform -translate-y-1/2 opacity-50 cursor-not-allowed"
        >
          Join Waitlist
        </Button>
      </div>

      <p class="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
        🚧 Uh oh... looks like our waitlist is still waiting for Waitlst. Stay tuned!
      </p>
    </div>

    <!-- Right Section: Feature Items -->
    <div class="flex flex-col space-y-8 w-full max-w-md">
      <LandingFeatureItem
        :icon="Zap"
        title="Fast Integration"
        description="Implement into your project in minutes."
      />
      <LandingFeatureItem
        :icon="ChartSpline"
        title="Analytics"
        description="Ready to go Analytics."
      />
      <LandingFeatureItem
        :icon="Download"
        title="Data Export"
        description="Export your Data and use it anywhere."
      />
    </div>
  </div>
  <LandingStepDisplay class="mt-36 mb-24 hidden lg:flex" />
</template>
