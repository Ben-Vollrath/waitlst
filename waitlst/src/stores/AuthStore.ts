import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

interface AuthState {
  id: string | null
  email: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    id: null,
    email: null,
  }),
  actions: {

    async initializeAuth() {
      // Fetch the current session and set it to the store
      const { data } = await supabase.auth.getSession()
      this.id = data?.session?.user?.id || null
      this.email = data?.session?.user?.email || null

      // Listen to authentication state changes
      supabase.auth.onAuthStateChange((_, session) => {
        console.log("state changed")
        this.id = session?.user.id || null
        this.email = session?.user.email || null
      })
    },
  },
})
