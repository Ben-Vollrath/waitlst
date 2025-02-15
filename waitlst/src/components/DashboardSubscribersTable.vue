<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useSignupStore } from '@/stores/SignupStore'

const signupStore = useSignupStore()
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Email</TableHead>
        <TableHead>Join Date</TableHead>
        <TableHead class="text-right"> source </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="invoice in signupStore.signups" :key="invoice.email">
        <TableCell class="font-medium">
          {{ invoice.email }}
        </TableCell>
        <TableCell>{{ invoice.joined_at }}</TableCell>
        <TableCell class="text-right">{{ invoice.source }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
