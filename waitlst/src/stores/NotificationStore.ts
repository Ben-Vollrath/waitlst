import { defineStore } from 'pinia'

// Define and export the NotificationType
export type NotificationType = 'success' | 'error' | 'info'

interface NotificationState {
  notificationInfo: {
    message: string
    type: NotificationType
  } | null
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    notificationInfo: null,
  }),
  actions: {
    notify(info: NotificationState['notificationInfo']) {
      this.notificationInfo = info
      setTimeout(() => (this.notificationInfo = null), 3000) // Hide after 3 seconds
    },
  },
})
