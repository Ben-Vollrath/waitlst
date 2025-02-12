import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('../views/DocsView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardView.vue'),
      children: [
        { path: '', component: () => import('@/components/DashboardOverview.vue')},
        { path: ':waitlistId', component: () => import('@/components/DashboardOverview.vue')},
        { path: 'subscribers/:waitlistId', component: () => import('@/components/DashboardSubscribers.vue') },
        { path: 'code/:waitlistId', component: () => import('@/components/DashboardCode.vue') },
        { path: 'settings/:waitlistId', component: () => import('@/components/DashboardSettings.vue') },
      ]
    }
  ],
})

export default router
