<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWaitlistStore } from '@/stores/WaitlistStore'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PulseLoader } from '@/components/ui/pulse-loader'

// Store instance
const waitlistStore = useWaitlistStore()

// Reactive state
const name = ref('')
const nameError = ref('')
const isLoading = ref(false)
const isDialogOpen = ref(false)

// Watch for changes in email input and clear error when user types
watch(name, () => {
  nameError.value = ''
})

// Function to handle signup
const handleAddCreate = async () => {
  if (!name.value) {
    nameError.value = 'Name is required'
    return
  }

  try {
    isLoading.value = true
    await waitlistStore.addWaitlist(name.value)

    // Reset form & close dialog after successful addition
    name.value = ''
    isDialogOpen.value = false
  } catch (error) {
    if (error instanceof Error) {
      nameError.value = error.message
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <p>+ Add Waitlist</p>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Waitlist</DialogTitle>
        <DialogDescription> Create a new Waitlist. Click save when you're done. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right"> Name </Label>
          <div class="col-span-3">
            <Input
              id="email"
              v-model="name"
              placeholder="Waitlist name"
              type="name"
              :disabled="isLoading"
              :class="nameError ? 'border-red-500 focus:border-red-500' : ''"
            />
            <p v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button @click="handleAddCreate" :disabled="isLoading">
          <template v-if="isLoading">
            <PulseLoader :loading="true" size="8px" margin="5px" color-class="bg-black" />
          </template>
          <template v-else> Save </template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
