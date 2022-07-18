import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

import ClientHome from '@/views/home-view.vue';
import { useAuthenticationStore } from '@/stores/authentication';

export enum routeNames {
  HOME = 'home',
  ABOUT = 'about',
  ADMIN = 'admin',
  ADMIN_LOGIN = 'admin login',
  ADMIN_HOME = 'admin home',
  ADMIN_CONFIG_HERO = 'admin hero'
}

export enum routeRoutes {
  HOME = '/',
  ABOUT = '/about',
  ADMIN = '/admin',
  ADMIN_LOGIN = '/login',
  ADMIN_HOME = '/config',
  ADMIN_CONFIG_HERO = '/hero'
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
    if (userIsAuthenticated) router.push({ name: routeNames.ADMIN_HOME });
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
      name: routeNames.HOME,
      path: routeRoutes.HOME,
      component: ClientHome
    },
    {
      name: routeNames.ABOUT,
      path: routeRoutes.ABOUT,
      component: () => import('@/views/about-view.vue')
    },
    {
      name: routeNames.ADMIN,
      path: routeRoutes.ADMIN,
      component: () => import('@/views/admin/admin.vue'),
      beforeEnter: [checkForAuthentication],
      children: [
        {
          name: routeNames.ADMIN_LOGIN,
          path: routeRoutes.ADMIN_LOGIN,
          component: () => import('@/views/admin/admin-login.vue')
        },
        {
          name: routeNames.ADMIN_HOME,
          path: routeRoutes.ADMIN_HOME,
          component: () => import('@/views/admin/admin-home.vue'),
          redirect: () => ({ name: routeNames.ADMIN_CONFIG_HERO }),
          children: [
            {
              name: routeNames.ADMIN_CONFIG_HERO,
              path: routeRoutes.ADMIN_CONFIG_HERO,
              component: () => import('@/views/admin/admin-config-hero.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
