import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SignUpSection from '@/components/LandingSignUpSection.vue'
import axios from 'axios'
import type { Mock } from 'vitest'

// Mock Axios
vi.mock('axios')

describe('LandingSignUpSection', () => {
  beforeEach(() => {
    vi.resetAllMocks() // Reset mock calls before each test
  })

  it('renders the form correctly', () => {
    const wrapper = mount(SignUpSection)

    // Check if the button exists and has correct text
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toContain('Join Waitlist')

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)

  })

  it('sends request to backend when button is clicked', async () => {
    (axios.post as Mock).mockResolvedValueOnce({ data: { success: true } })

    const wrapper = mount(SignUpSection)

    const input = wrapper.find('input')
    await input.setValue('test@test.com')
    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: 'test@test.com',
      waitlist_id: expect.any(String),
    })

    expect (wrapper.find('button').text()).toContain('Signed Up!')
  })


  it('shows error message when request fails', async () => {
    (axios.post as Mock).mockRejectedValueOnce(new Error('Request failed'))

    const wrapper = mount(SignUpSection)

    const input = wrapper.find('input')

    await input.setValue('test@test.com')
    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      email: 'test@test.com',
      waitlist_id: expect.any(String),
    })

    expect(wrapper.text()).toContain("Couldn't sign up. Please try again later.");

  })

  it('doesnt send request when isLoading or isSignedUp is true', async () => {
    const wrapper = mount(SignUpSection)

    const input = wrapper.find('input')
    await input.setValue('test@test.com')
    await wrapper.find('form').trigger('submit.prevent')

    await input.setValue('test2@test.com')
    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledTimes(1)
  })

})
