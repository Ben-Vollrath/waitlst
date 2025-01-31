<script setup lang="ts">
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'

import { Code, BookUser, ChartSpline, Rocket } from 'lucide-vue-next'

const steps = [
  {
    step: 1,
    title: 'Integrate Waitlst',
    description: 'Add a waitlist to your site in minutes.',
    icon: Code,
  },
  {
    step: 2,
    title: 'Build Subscribers',
    description: 'Start building your subscriber list.',
    icon: BookUser,
  },
  {
    step: 3,
    title: 'Analyze',
    description: 'Analyze your subscriber data.',
    icon: ChartSpline,
  },
  {
    step: 4,
    title: 'Launch',
    description: 'Launch your product.',
    icon: Rocket,
  },
]
</script>

<template>
  <div class="flex center-items w-full justify-center">
    <Stepper orientation="vertical" class="w-full max-w-6xl px-4">
      <!-- Sets a max width for auto scaling -->
      <StepperItem v-for="item in steps" :key="item.step" class="basis-1/3" :step="item.step">
        <StepperTrigger>
          <StepperIndicator>
            <component :is="item.icon" class="w-6 h-6" />
          </StepperIndicator>
          <div class="flex flex-col">
            <StepperTitle>
              {{ item.title }}
            </StepperTitle>
            <StepperDescription>
              {{ item.description }}
            </StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator v-if="item.step !== steps[steps.length - 1].step" class="w-full h-px" />
      </StepperItem>
    </Stepper>
  </div>
</template>
