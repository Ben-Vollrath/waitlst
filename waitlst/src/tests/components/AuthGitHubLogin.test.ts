import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import OAuthLoginButton from '@/components/AuthGitHubLogin.vue'
import { supabase } from '@/utils/supabase.ts'
import type { Mock } from 'vitest'

// Mock Supabase authentication
vi.mock('@/utils/supabase.ts', () => ({
  supabase: {
    auth: {
      signInWithOAuth: vi.fn(),
    },
  },
}))

describe('OAuthLoginButton.vue', () => {
  it('renders the button correctly', () => {
    const wrapper = mount(OAuthLoginButton)

    // Check if the button exists and has correct text
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Continue with GitHub')

    // Check if GitHub logo exists
    const img = wrapper.find('img[alt="GitHub Logo"]')
    expect(img.exists()).toBe(true)
  })

  it('calls Supabase signInWithOAuth when button is clicked', async () => {
    const wrapper = mount(OAuthLoginButton)

    // Mock Supabase response
    const mockSignIn = supabase.auth.signInWithOAuth as Mock
    mockSignIn.mockResolvedValue({ error: null })

    // Click button
    await wrapper.find('button').trigger('click')

    // Expect Supabase sign-in function to be called
    expect(mockSignIn).toHaveBeenCalledWith({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  })

  it('disables button and shows loader while loading', async () => {
    const wrapper = mount(OAuthLoginButton)

    // Mock Supabase auth function to simulate loading state
    const mockSignIn = supabase.auth.signInWithOAuth as Mock
    mockSignIn.mockImplementation(() => new Promise(() => {})) // Keeps promise pending

    // Click button
    await wrapper.find('button').trigger('click')

    // Button should be disabled
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()

    // Loader should be visible
    expect(wrapper.findComponent({ name: 'PulseLoader' }).exists()).toBe(true)
  })

  it('shows an alert when login fails', async () => {
    const wrapper = mount(OAuthLoginButton)

    // Mock Supabase error
    const mockSignIn = supabase.auth.signInWithOAuth as Mock
    mockSignIn.mockResolvedValue({ error: new Error('Login failed') })

    // Spy on alert function
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    // Click button
    await wrapper.find('button').trigger('click')

    // Expect alert to be called
    expect(window.alert).toHaveBeenCalledWith('Login failed')
  })
})
