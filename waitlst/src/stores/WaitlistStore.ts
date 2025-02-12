import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { useAuthStore } from '@/stores/AuthStore';

interface WaitlistState {
  waitlists: {
    id: string,
    user_id: string,
    name: string,
    created_at: string,
  }[]
}


export const useWaitlistStore = defineStore('waitlist', {
  state: (): WaitlistState => ({
    waitlists: [],
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
  },
});
