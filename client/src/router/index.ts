import { createRouter, createWebHistory } from 'vue-router'
import ClientHome from '@/views/home-view.vue';

export enum routeNames {
  HOME = 'home',
  ABOUT = 'about',
  ADMIN = 'admin'
}

export enum routeRoutes {
  HOME = '/',
  ABOUT = '/about',
  ADMIN = '/admin'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routeRoutes.HOME,
      name: routeNames.HOME,
      component: ClientHome
    },
    {
      path: routeRoutes.ABOUT,
      name: routeNames.ABOUT,
      component: () => import('@/views/about-view.vue')
    },
    {
      path: routeRoutes.ADMIN,
      name: routeNames.ADMIN,
      component: () => import('@/views/admin-login.vue')
    }
  ]
})

export default router
