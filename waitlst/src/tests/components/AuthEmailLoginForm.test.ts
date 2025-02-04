import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import EmailLoginForm from '@/components/AuthEmailLoginForm.vue'
import { supabase } from '@/utils/supabase.ts'
import type { Mock } from 'vitest'

// Mock Supabase auth function
vi.mock('@/utils/supabase.ts', () => ({
  supabase: {
    auth: {
      signInWithOtp: vi.fn(),
    },
  },
}))

describe('EmailLoginForm.vue', () => {
  it('updates the email value when user types', async () => {
    const wrapper = mount(EmailLoginForm)
    const emailInput = wrapper.find('input[type="email"]')

    await emailInput.setValue('test@example.com')

    expect((emailInput.element as HTMLInputElement).value).toBe('test@example.com')
  })

  it('calls Supabase signInWithOtp when form is submitted', async () => {
    const wrapper = mount(EmailLoginForm)
    const email = 'test@example.com'

    // Set email value
    await wrapper.find('input[type="email"]').setValue(email)

    // Mock Supabase response
    const mockSignIn = supabase.auth.signInWithOtp as Mock
    mockSignIn.mockResolvedValue({ error: null })

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    // Expect Supabase to be called with correct email
    expect(mockSignIn).toHaveBeenCalledWith({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    })
  })

  it('disables button and shows loader when loading', async () => {
    const wrapper = mount(EmailLoginForm)
    const email = 'test@example.com'

    await wrapper.find('input[type="email"]').setValue(email)

    // Mock Supabase auth function to simulate loading
    const mockSignIn = supabase.auth.signInWithOtp as Mock
    mockSignIn.mockImplementation(() => new Promise(() => {})) // Keep it pending

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    // Button should be disabled
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()

    // Loader should be visible
    expect(wrapper.findComponent({ name: 'PulseLoader' }).exists()).toBe(true)
  })

  it('shows an alert when login fails', async () => {
    const wrapper = mount(EmailLoginForm)
    const email = 'test@example.com'

    await wrapper.find('input[type="email"]').setValue(email)

    // Mock Supabase auth failure
    const mockSignIn = supabase.auth.signInWithOtp as Mock
    mockSignIn.mockResolvedValue({ error: new Error('Login failed') })

    // Spy on window.alert
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    // Expect alert to be called
    expect(window.alert).toHaveBeenCalledWith('Login failed')
  })
})
