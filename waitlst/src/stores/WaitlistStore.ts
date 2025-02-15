import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { useAuthStore } from '@/stores/AuthStore';
import { useSignupStore } from '@/stores/SignupStore';

interface WaitlistState {
  waitlists: {
    id: string,
    user_id: string,
    name: string,
    created_at: string,
  }[],
  selectedWaitlist: string | null,
}


export const useWaitlistStore = defineStore('waitlist', {
  state: (): WaitlistState => ({
    waitlists: [],
    selectedWaitlist: null,
  }),

  actions: {
    async fetchWaitlists() {
      const authStore = useAuthStore();
      const userId = authStore.id;

      if (!userId) return;

      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching waitlists:', error);
        return;
      }

      this.waitlists = data;
    },
    selectWaitlist(id: string) {
      this.selectedWaitlist = id;
      // Fetch signups for the new waitlist
      const signupStore = useSignupStore();
      signupStore.fetchSignups();
    },
    async addWaitlist(name: string) {
      const authStore = useAuthStore();
      const userId = authStore.id;

      if (!userId) return;

      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ name, user_id: userId }]).select();

      if (error) {
        console.error('Error adding waitlist:', error);
        return;
      }

      if (data) {
        this.waitlists.push(data[0]);
      }
    },
  },
});

