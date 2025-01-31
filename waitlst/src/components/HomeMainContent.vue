<script setup lang="ts">
import { ref } from 'vue'
import { Zap, Download, ChartSpline, FileText, Clock, Database } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import FeatureItem from '@/components/HomeFeatureItem.vue'
import HomeStepDisplay from '@/components/HomeStepDisplay.vue'
import HomeAnalyticsChart from '@/components/HomeAnalyticsChart.vue'
import { VCodeBlock } from '@wdns/vue-code-block'

const code = ref(`
import axios from 'axios';

async function joinWaitlist(email, waitlistId) {
  try {
    const response = await axios.post('https://waitlst.vollrath.io/', {
      email: email,
      waitlist_id: waitlistId,
    });

    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}
`)
</script>

<template>
  <div
    class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 sm:gap-24"
  >
    <!-- Left Section: Headline + Text + Button -->
    <div id="main" class="scroll-mt-32 flex flex-col gap-4 max-w-lg text-center lg:text-left">
      <h1 class="text-4xl font-semibold dark:text-white">Waitlists for developers.</h1>
      <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg">
        Add a waitlist to your site in minutes — no hassle, just one API call.
      </p>
      <Button>Coming Soon!</Button>
    </div>

    <!-- Right Section: Feature Items -->
    <div class="flex flex-col space-y-8 w-full max-w-md">
      <FeatureItem
        :icon="Zap"
        title="Fast Integration"
        description="Implement into your project in minutes."
      />
      <FeatureItem :icon="ChartSpline" title="Analytics" description="Ready to go Analytics." />
      <FeatureItem
        :icon="Download"
        title="Data Export"
        description="Export your Data and use it anywhere."
      />
    </div>
  </div>

  <!-- Step Display (Hidden on Mobile, Shown on Desktop) -->
  <HomeStepDisplay class="mt-36 mb-24 hidden lg:flex" />
  <div id="introduction" class="scroll-mt-16 flex flex-col gap-4 w-full text-center">
    <h1 class="text-4xl font-semibold dark:text-white">Integrate in minutes</h1>
    <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg max-w-lg mx-auto">
      A simple, elegant API endpoint, so you can start building your build pad in minutes. Integrate
      into your codebase without adding any extra dependencies.
    </p>
  </div>
  <div class="w-full flex justify-center items-center px-4 overflow-hidden">
    <VCodeBlock
      :persistent-copy-button="true"
      :code="code"
      highlightjs
      lang="javascript"
      theme="night-owl"
      class="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto overflow-x-auto"
    />
  </div>
  <div id="analytics" class="scroll-mt-16 flex flex-col gap-4 w-full text-center">
    <h1 class="text-4xl font-semibold dark:text-white">Track, Optimize, and Grow</h1>
    <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg max-w-lg mx-auto">
      Gain real-time insights into your waitlist. Track user engagement, measure conversion rates,
      and optimize your onboarding strategy—all from a powerful, easy-to-use dashboard.
    </p>
  </div>
  <HomeAnalyticsChart />
  <div id="export" class="scroll-mt-16 flex flex-col gap-4 w-full text-center">
    <h1 class="text-4xl font-semibold dark:text-white">Seamless Data Export</h1>
    <p class="text-neutral-500 dark:text-neutral-400 sm:mt-2 md:text-lg max-w-lg mx-auto">
      Take full control of your waitlist data. Export your user lists in multiple formats, including
      CSV, JSON, and Excel, making it easy to integrate with your existing tools and workflows.
    </p>
  </div>
  <div class="flex flex-wrap justify-center gap-6 md:space-x-8">
    <FeatureItem
      :icon="FileText"
      title="Multiple Formats"
      description="Export waitlist data in CSV, JSON, and Excel for easy integration."
    />
    <FeatureItem
      :icon="Clock"
      title="Instant Access"
      description="Download your data in one click—no complex setup required."
    />
    <FeatureItem
      :icon="Database"
      title="Sync with Your Tools"
      description="Seamlessly integrate with CRMs, analytics tools, and databases."
    />
  </div>
</template>
