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
    async addSignup(email: string, source: string) {
      const waitlistStore = useWaitlistStore();
      const waitlistId = waitlistStore.selectedWaitlist;

      if (!waitlistId) return;

      const { data, error } = await supabase
        .from('waitlist_signup')
        .insert([{ email, waitlist_id: waitlistId, source }]).select();
      console.log('Signup added:', data);

      if (error) {
        console.error('Error adding signup:', error);
        return;
      }
      console.log('Signup added:', data);
      if (data) {
        this.signups.push(data[0]);
      }
    },
    async removeSignup(email: string) {
      const waitlistStore = useWaitlistStore();
      const waitlistId = waitlistStore.selectedWaitlist;

      if (!waitlistId) return;

      const { data, error } = await supabase
        .from('waitlist_signup')
        .delete()
        .eq('email', email)
        .eq('waitlist_id', waitlistId)
        .select();

      if (error) {
        console.error('Error removing signup:', error);
        return;
      }

      if (data) {
        this.signups = this.signups.filter((signup) => signup.email !== email);
      }
    }
  },
});
