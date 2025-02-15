<script setup lang="ts">
import { ref, watch } from 'vue'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PulseLoader } from '@/components/ui/pulse-loader'

// Store instance
const signupStore = useSignupStore()

// Reactive state
const email = ref('')
const source = ref('')
const emailError = ref('')
const isLoading = ref(false)
const isDialogOpen = ref(false)

// Watch for changes in email input and clear error when user types
watch(email, () => {
  emailError.value = ''
})

// Function to handle signup
const handleAddSignup = async () => {
  if (!email.value) {
    emailError.value = 'Email is required'
    return
  }

  try {
    isLoading.value = true
    await signupStore.addSignup(email.value, source.value)

    // Reset form & close dialog after successful addition
    email.value = ''
    source.value = ''
    isDialogOpen.value = false
  } catch (error) {
    if (error instanceof Error) {
      emailError.value = error.message
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button variant="outline"> + Add New </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Subscriber</DialogTitle>
        <DialogDescription>
          Manually add a Subscriber here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="email" class="text-right"> Email </Label>
          <div class="col-span-3">
            <Input
              id="email"
              v-model="email"
              placeholder="example@test.com"
              type="email"
              :disabled="isLoading"
              :class="emailError ? 'border-red-500 focus:border-red-500' : ''"
            />
            <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="source" class="text-right"> Source </Label>
          <Input
            id="source"
            v-model="source"
            placeholder="Twitter, Website, etc."
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button @click="handleAddSignup" :disabled="isLoading">
          <template v-if="isLoading">
            <PulseLoader :loading="true" size="8px" margin="5px" color-class="bg-black" />
          </template>
          <template v-else> Save </template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
