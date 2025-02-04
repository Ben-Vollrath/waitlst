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

  it('redirects to /auth when user is not authenticated', async () => {
    // Mock router
    const mockRouter = { push: vi.fn() }
    ;(useRouter as Mock).mockReturnValue(mockRouter)

    mount(DashboardView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })

    await flushPromises()

    // Router should navigate to /auth
    expect(mockRouter.push).toHaveBeenCalledWith('/auth')
  })

  it('does NOT redirect when user is authenticated', async () => {
    // Mock router
    const mockRouter = { push: vi.fn() }
    ;(useRouter as Mock).mockReturnValue(mockRouter)

    // Create Pinia store with initial state
    const pinia = createTestingPinia({
      createSpy: vi.fn,
    })

    const authStore = useAuthStore()
    authStore.id = '123'

    // Mount the component **after** setting up Pinia
    const wrapper = mount(DashboardView, {
      global: {
        plugins: [pinia],
      },
    })

    // Wait for reactivity updates
    await flushPromises()

    expect(mockRouter.push).not.toHaveBeenCalled()
  })


  it('calls Supabase signOut when clicking logout button', async () => {
    // Mock router
    const mockRouter = { push: vi.fn() }
    ;(useRouter as Mock).mockReturnValue(mockRouter)

    const wrapper = mount(DashboardView, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            auth: {
              id: '123',
              email: 'test@example.com',
            },
          },
          createSpy: vi.fn,
        })],
      },
    })

    // Find and click the logout button
    await wrapper.find('button').trigger('click')

    // Ensure supabase.auth.signOut was called
    expect(supabase.auth.signOut).toHaveBeenCalled()
  })
})
