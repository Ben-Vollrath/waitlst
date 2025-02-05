<template>
  <div class="v-spinner" v-show="loading">
    <div
      class="v-pulse v-pulse1"
      :class="tailwindColor"
      :style="[spinnerStyle, spinnerDelay1]"
    ></div>
    <div
      class="v-pulse v-pulse2"
      :class="tailwindColor"
      :style="[spinnerStyle, spinnerDelay2]"
    ></div>
    <div
      class="v-pulse v-pulse3"
      :class="tailwindColor"
      :style="[spinnerStyle, spinnerDelay3]"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PulseLoader',

  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '15px', // Size of each pulse
    },
    margin: {
      type: String,
      default: '4px', // Margin between pulses
    },
    radius: {
      type: String,
      default: '100%', // Border radius for circular shape
    },
    colorClass: {
      type: String,
      default: 'bg-primary', // Default Tailwind color class
    },
  },

  computed: {
    spinnerStyle() {
      return {
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: 'inline-block',
        animationName: 'v-pulseStretchDelay',
        animationDuration: '0.75s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
        animationFillMode: 'both',
      }
    },
    tailwindColor() {
      // Dynamically apply Tailwind color class
      return this.colorClass
    },
  },

  data() {
    return {
      spinnerDelay1: { animationDelay: '0.12s' },
      spinnerDelay2: { animationDelay: '0.24s' },
      spinnerDelay3: { animationDelay: '0.36s' },
    }
  },
}
</script>

<style>
@-webkit-keyframes v-pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}

@keyframes v-pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}
</style>
