<script setup lang="ts">
import { Zap, Download, ChartSpline, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button/'
import { Input } from '@/components/ui/input'
import LandingFeatureItem from '@/components/LandingFeatureItem.vue'
import LandingStepDisplay from '@/components/LandingStepDisplay.vue'
import axios from 'axios'
import { ref, watch } from 'vue'

const waitlistSignupUrl = import.meta.env.VITE_WAITLIST_SIGNUP_ENDPOINT
const waitlistId = import.meta.env.VITE_WAITLIST_ID

const email = ref('')
const isSignedUp = ref(false)
const isLoading = ref(false)
const emailError = ref('')

watch(email, () => {
  emailError.value = ''
})

const signUpEmail = async () => {
  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }

  if (isSignedUp.value || isLoading.value) return

  isLoading.value = true

  try {
    await axios.post(waitlistSignupUrl, {
      email: email.value,
      waitlist_id: waitlistId,
    })

    isSignedUp.value = true
  } catch (error) {
    if (error instanceof Error) {
      emailError.value = "Couldn't sign up. Please try again later."
    }
  } finally {
    isLoading.value = false
  }
}
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

      <!-- Signup Form -->
      <form class="relative w-full max-w-md" @submit.prevent="signUpEmail">
        <Input
          type="email"
          placeholder="your@email.com"
          v-model="email"
          :disabled="isSignedUp || isLoading"
          class="w-full"
          :class="{
            'border-red-500 focus:border-red-500': emailError,
            'border-green-500 focus:border-green-500': isSignedUp,
          }"
        />

        <Button
          class="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center gap-2"
          :disabled="isSignedUp || isLoading"
        >
          <template v-if="isSignedUp">
            <p>Signed Up!</p>
            <Check class="w-5 h-5 text-green-500" />
          </template>
          <template v-else-if="isLoading"> ⏳ Joining... </template>
          <template v-else> Join Waitlist </template>
        </Button>
      </form>
      <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>

      <div class="flex items-center gap-2">
        <p class="text-sm text-gray-500 dark:text-gray-400 italic">Integrated using</p>

        <!-- Wrap the logo & text to keep them aligned -->
        <a href="#" class="flex items-center gap-2">
          <img src="@/assets/logo.svg" alt="Waitlst logo" class="h-6 w-6" />
          <h1 class="font-bold text-sm">Waitlst</h1>
        </a>

        <!-- Navigation Elements (keeps spacing with `ml-auto` if needed) -->
        <LandingNavigationElements class="hidden md:flex ml-auto" />
      </div>
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
