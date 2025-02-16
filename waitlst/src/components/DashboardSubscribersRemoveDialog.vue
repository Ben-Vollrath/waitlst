<script setup lang="ts">
import { ref } from 'vue'
import { useSignupStore } from '@/stores/SignupStore'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PulseLoader } from '@/components/ui/pulse-loader'
import { Trash } from 'lucide-vue-next'

const props = defineProps({
  email: String,
})

const signupStore = useSignupStore()
const isLoading = ref(false)
const isDialogOpen = ref(false)

// Function to handle signup
const handleRemoveSignup = async () => {
  if (!props.email) {
    return
  }

  try {
    isLoading.value = true
    await signupStore.removeSignup(props.email)

    isDialogOpen.value = false
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button variant="ghost"> <Trash /> </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription> Are you sure you want to remove this subscriber? </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <h1>{{ props.email }}</h1>
        </div>
      </div>
      <DialogFooter>
        <Button @click="handleRemoveSignup" :disabled="isLoading">
          <template v-if="isLoading">
            <PulseLoader :loading="true" size="8px" margin="5px" color-class="bg-black" />
          </template>
          <template v-else> Save </template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
