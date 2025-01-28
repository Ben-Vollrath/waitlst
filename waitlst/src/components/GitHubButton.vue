<template>
  <div class="flex justify-center items-center">
    <a :href="repoUrl" target="_blank" rel="noopener noreferrer" class="github-link">
      <button
        class="flex items-center border border-gray-300 h-8 rounded-lg px-2 py-1 hover:bg-gray-800 shadow-sm"
      >
        <img src="@/assets/github-mark-white.svg" alt="GitHub Logo" class="h-4 w-4 mr-3" />
        <span class="text-sm font-semibold mr-3">Star</span>
        <div class="w-px h-6 bg-gray-300 mx-3"></div>
        <span v-if="stars !== null" class="text-sm font-semibold">{{ stars }}</span>
        <span v-else class="text-sm font-medium">-</span>
      </button>
    </a>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

const stars = ref<number>(0)
const repoUrl = 'https://github.com/Ben-Vollrath/waitlst'

async function fetchGithubStars() {
  const response = await axios.get('https://api.github.com/repos/Ben-Vollrath/waitlst')
  stars.value = response.data.stargazers_count
}

onMounted(() => {
  fetchGithubStars()
})
</script>
