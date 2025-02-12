import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase'


interface SignupState {
  signups: {
    id: string,
    waitlist_id: string,
    email: string,
    joined_at: string,
    source: string,
  }[]
}


export const useSignupStore = defineStore('signup', {
  state: (): SignupState => ({
    signups: [],
  }),

  actions: {
    async fetchSignups(waitlistId: string) {
      if (!waitlistId) return;

      const { data, error } = await supabase
        .from('waitlist_signup')
        .select('*')
        .eq('waitlist_id', waitlistId)
        .order('joined_at', { ascending: true });

      if (error) {
        console.error('Error fetching signups:', error);
        return;
      }

      this.signups = data;
    },
  },
});
