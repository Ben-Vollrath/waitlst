import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import DashboardView from '@/views/DashboardView.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore.ts'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia, createPinia } from 'pinia'
import { supabase } from '@/utils/supabase.ts'

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

// Mock Supabase
vi.mock('@/utils/supabase.ts', () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}))

describe('DashboardView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
})
