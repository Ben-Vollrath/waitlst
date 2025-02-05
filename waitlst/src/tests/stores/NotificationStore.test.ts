import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '@/stores/NotificationStore'
import type { NotificationType } from '@/stores/NotificationStore'

describe('Notification Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia()) // Ensures a fresh Pinia store instance before each test
  })

  it('should initialize with no notification', () => {
    const store = useNotificationStore()
    expect(store.notificationInfo).toBeNull()
  })

  it('should set notification info when notify is called', () => {
    const store = useNotificationStore()

    const notificationData: { message: string; type: NotificationType } = {
      message: 'Test notification',
      type: 'success'
    }
    store.notify(notificationData)

    expect(store.notificationInfo).toEqual(notificationData)
  })

  it('should clear notification after 3 seconds', () => {
    vi.useFakeTimers() // Mock timers to simulate the timeout behavior
    const store = useNotificationStore()

    const notificationData: { message: string; type: NotificationType } = {
      message: 'Test notification',
      type: 'info'
    }
    store.notify(notificationData)

    expect(store.notificationInfo).toEqual(notificationData)

    vi.advanceTimersByTime(3000) // Fast-forward time by 3 seconds

    expect(store.notificationInfo).toBeNull()
    vi.useRealTimers() // Restore real timers after test
  })
})
