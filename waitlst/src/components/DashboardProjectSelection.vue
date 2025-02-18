<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { useRouter, useRoute } from 'vue-router'
import DashboardProjectCreateDialog from '@/components/DashboardProjectCreateDialog.vue'

const waitlistStore = useWaitlistStore()
const open = ref(false)
const router = useRouter()
const route = useRoute()

// Get the selected waitlist name
const selectedWaitlist = computed(() => {
  return (
    waitlistStore.waitlists.find((w) => w.id === waitlistStore.selectedWaitlist)?.name ||
    'Select waitlist...'
  )
})

const selectWaitlist = (waitlistId: string) => {
  waitlistStore.selectWaitlist(waitlistId)
  open.value = false

  const pathSegments = route.path.split('/')
  const section = pathSegments.length > 2 ? pathSegments[2] : ''

  const newPath = section ? `/dashboard/${section}/${waitlistId}` : `/dashboard/#/${waitlistId}`

  router.push(newPath)
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
              v-for="waitlist in waitlistStore.waitlists"
              :key="waitlist.id"
              :value="waitlist.name"
              @select="() => selectWaitlist(waitlist.id)"
            >
              {{ waitlist.name }}
              <CheckIcon
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    waitlistStore.selectedWaitlist === waitlist.id ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
          <CommandGroup>
            <CommandItem value="create-new">
              <DashboardProjectCreateDialog />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
