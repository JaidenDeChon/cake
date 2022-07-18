import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

import ClientHome from '@/views/home-view.vue';
import { useAuthenticationStore } from '@/stores/authentication';

export enum routeNames {
  HOME = 'home',
  ABOUT = 'about',
  ADMIN_LOGIN = 'login',
  ADMIN = 'admin',
}

export enum routeRoutes {
  HOME = '/',
  ABOUT = '/about',
  ADMIN_LOGIN = '/login',
  ADMIN = '/admin',
}

/**
 * Checks whether the user is already authenticated and intervenes accordingly. Used before user can enter
 * an admin-only route.
 * @param   { RouteLocationNormalized }   to     The `to` parameter is automatically passed by vue router.
 * @param   { RouteLocationNormalized }   from   The `from` parameter is automatically passed by vue router.
 */
function checkForAuthentication (to: RouteLocationNormalized, from: RouteLocationNormalized) {

  const authenticationStore = useAuthenticationStore();
  const userIsAuthenticated = authenticationStore.userIsAuthenticated;

  if (to.name === routeNames.ADMIN_LOGIN) {
    if (userIsAuthenticated) router.push({ name: routeNames.ADMIN });
    else return true;
  }

  else if (to.name === routeNames.ADMIN) {
    if (userIsAuthenticated) return true;
    else router.push({ name: routeNames.ADMIN_LOGIN });
  }
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
      component: () => import('@/views/admin/admin.vue'),
      beforeEnter: [checkForAuthentication],
      children: [
        {
          path: routeRoutes.ADMIN_LOGIN,
          name: routeNames.ADMIN_LOGIN,
          component: () => import('@/views/admin/admin-login.vue')
        },
      ]
    }
  ]
})

export default router
