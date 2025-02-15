import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase'
import { useWaitlistStore } from '@/stores/WaitlistStore';


interface SignupState {
  signups: {
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
    async fetchSignups() {
      const waitlistStore = useWaitlistStore();
      const waitlistId = waitlistStore.selectedWaitlist;

      if (!waitlistId) return;

      const { data, error } = await supabase
        .from('waitlist_signup')
        .select('email, joined_at, source')
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
