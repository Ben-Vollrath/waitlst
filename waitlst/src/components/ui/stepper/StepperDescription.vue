<script lang="ts" setup>
import type { StepperDescriptionProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { StepperDescription, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

// Fix: Ensure slot props are always valid
type StepperDescriptionSlotProps = Parameters<
  NonNullable<InstanceType<typeof StepperDescription>['$slots']['default']>
>[0]

// Define component props
const props = defineProps<StepperDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperDescription
    v-slot="slotProps: StepperDescriptionSlotProps"
    v-bind="forwarded"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot v-bind="slotProps" />
  </StepperDescription>
</template>
