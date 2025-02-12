<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWaitlistStore } from '@/stores/WaitlistStore'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'

// Store setup
const waitlistStore = useWaitlistStore()
const open = ref(false)
const selectedWaitlistId = ref<string | null>(null)

// Computed property to get waitlists
const waitlists = computed(() => waitlistStore.waitlists)

// Get the selected waitlist name
const selectedWaitlist = computed(() => {
  return (
    waitlists.value.find((w) => w.id === selectedWaitlistId.value)?.name || 'Select waitlist...'
  )
})

// Select a waitlist from the dropdown
const selectWaitlist = (waitlistId: string) => {
  selectedWaitlistId.value = waitlistId
  open.value = false
}

// Handle creating a new waitlist
const createNewWaitlist = () => {
  console.log('TODO: Open waitlist creation modal or navigate to create page')
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{ selectedWaitlist }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search waitlist..." />
        <CommandEmpty>No waitlists found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="waitlist in waitlists"
              :key="waitlist.id"
              :value="waitlist.name"
              @select="() => selectWaitlist(waitlist.id)"
            >
              {{ waitlist.name }}
              <CheckIcon
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    selectedWaitlistId === waitlist.id ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
          <!-- Create New Waitlist Button -->
          <CommandGroup>
            <CommandItem value="create-new" @select="createNewWaitlist"> + Create new </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
