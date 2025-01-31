<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const LandingSignUpSection = defineAsyncComponent(
  () => import('@/components/LandingSignUpSection.vue'),
)
const LandingIntroductionSection = defineAsyncComponent(
  () => import('@/components/LandingIntroductionSection.vue'),
)
const LandingAnalyticsSection = defineAsyncComponent(
  () => import('@/components/LandingAnalyticsSection.vue'),
)
const LandingExportSection = defineAsyncComponent(
  () => import('@/components/LandingExportSection.vue'),
)
</script>

<template>
  <LandingSignUpSection />
  <LandingIntroductionSection />
  <LandingAnalyticsSection />
  <LandingExportSection />
</template>
