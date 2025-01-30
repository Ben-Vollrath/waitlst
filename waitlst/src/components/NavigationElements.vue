<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import '@/assets/perlin-bg.css'
import NavigationFeaturesContent from '@/components/NavigationFeaturesContent.vue'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="text-xl font-bold bg-transparent"
          >Features</NavigationMenuTrigger
        >
        <NavigationMenuContent>
          <NavigationFeaturesContent />
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
