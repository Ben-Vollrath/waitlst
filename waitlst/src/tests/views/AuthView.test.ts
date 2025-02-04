import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'

import AuthView from '@/views/AuthView.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore.ts'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia, createPinia } from 'pinia'

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))


describe('AuthView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('does NOT navigate when user is not authenticated', async () => {

    // Mock router
    const mockRouter = { push: vi.fn() }
    ;(useRouter as Mock).mockReturnValue(mockRouter)

    mount(AuthView, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn
        })],
      }
    })

    const authStore = useAuthStore()
    await flushPromises()

    // Router push should NOT be called
    expect(mockRouter.push).not.toHaveBeenCalled()
  })

  it('does navigate when user is authenticated', async () => {

    // Mock router
    const mockRouter = { push: vi.fn() }
    ;(useRouter as Mock).mockReturnValue(mockRouter)

    mount(AuthView, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn
        })],
      }
    })

    const authStore = useAuthStore()
    authStore.id = '123'
    await flushPromises()

    // Router push should NOT be called
    expect(mockRouter.push).toHaveBeenCalled()
  })

})
