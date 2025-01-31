<template>
  <Button variant="outline">
    <a
      :href="repoUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center github-link"
    >
      <img src="@/assets/github-mark-white.svg" alt="GitHub Logo" class="h-4 w-4 mr-2" />
      <span class="text-sm font-semibold">Star</span>
      <div class="w-px h-6 bg-input mx-2"></div>
      <span v-if="stars !== null" class="text-sm font-semibold">{{ stars }}</span>
      <span v-else class="text-sm font-medium">-</span>
    </a>
  </Button>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Button from '@/components/ui/button/Button.vue'

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
