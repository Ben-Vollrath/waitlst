<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import DashboardSubscribersRemoveDialog from '@/components/DashboardSubscribersRemoveDialog.vue'
import { useSignupStore } from '@/stores/SignupStore'

const signupStore = useSignupStore()
</script>

<template>
  <div class="w-full overflow-hidden">
    <div class="w-full overflow-x-auto">
      <Table class="min-w-[600px] w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="signUp in signupStore.signups" :key="signUp.email">
            <TableCell class="font-medium">
              {{ signUp.email }}
            </TableCell>
            <TableCell>{{ signUp.joined_at }}</TableCell>
            <TableCell>{{ signUp.source }}</TableCell>
            <TableCell class="text-right">
              <DashboardSubscribersRemoveDialog :email="signUp.email" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
