import { createRouter, createWebHistory } from 'vue-router'
import ClientHome from '@/views/home-view.vue';

export enum routeNames {
  HOME = 'home',
  ABOUT = 'about'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ClientHome
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/about-view.vue')
    }
  ]
})

export default router
