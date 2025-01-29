<script setup lang="ts"></script>

<template>
  <ul
    class="grid gap-3 md:p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
  >
    <li class="row-span-3 h-full w-full perlin-bg relative overflow-hidden rounded-md">
      <div class="absolute inset-0 z-0 el"></div>
      <!-- Background Animation -->

      <!-- Your Content -->
      <div class="relative z-10 h-full w-full">
        <NavigationMenuLink as-child>
          <a
            class="flex h-full w-full select-none flex-col justify-end bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
            href="/"
          >
            <img src="@/assets/logo.svg" class="h-12 w-12" />
            <div class="mb-2 mt-4 text-lg font-medium">Waitlst API</div>
            <p class="text-sm leading-tight text-muted-foreground">
              Solve wait lists with one POST request.
            </p>
          </a>
        </NavigationMenuLink>
      </div>
    </li>

    <li>
      <NavigationMenuLink as-child>
        <a
          href="/docs/introduction"
          class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div class="text-sm font-medium leading-none">Introduction</div>
          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
            A simple wait list solution for developers.
          </p>
        </a>
      </NavigationMenuLink>
    </li>
    <li>
      <NavigationMenuLink as-child>
        <a
          href="/docs"
          class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div class="text-sm font-medium leading-none">Analytics</div>
          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Track Engagement and Conversion.
          </p>
        </a>
      </NavigationMenuLink>
    </li>
    <li>
      <NavigationMenuLink as-child>
        <a
          href="/docs/typography"
          class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div class="text-sm font-medium leading-none">Export</div>
          <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
            Export your Audience Data to use anywhere.
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  </ul>
</template>
