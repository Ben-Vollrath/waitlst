<script setup lang="ts">
import { ref } from 'vue'
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
</template>
