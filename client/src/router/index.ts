import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

import ClientHome from '@/views/home-view.vue';
import { useAuthenticationStore } from '@/stores/authentication';

export enum routeNames {
  HOME = 'home',
  ADMIN = 'admin',
  ADMIN_LOGIN = 'admin login',
  ADMIN_LOGOUT = 'admin logout',
  ADMIN_HOME = 'admin home',
  ADMIN_CONFIG_HERO = 'admin hero',
  ADMIN_CONFIG_BLOG_POSTS = 'admin blog posts',
  ADMIN_CONFIG_ROUTES = 'admin routes'
}

export enum routeRoutes {
  HOME = '/',
  ADMIN = '/admin',
  ADMIN_LOGIN = '/login',
  ADMIN_LOGOUT = '/logout',
  ADMIN_HOME = '/config',
  ADMIN_CONFIG_HERO = '/admin-hero',
  ADMIN_CONFIG_BLOG_POSTS = '/admin-blog-posts',
  ADMIN_CONFIG_ROUTES = '/admin-routes'
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

  // 500ms value is 0.3s transition + 0.2s transition delay
  scrollBehavior () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, left: 0 });
      }, 500)
    });
  },

  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      name: routeNames.HOME,
      path: routeRoutes.HOME,
      component: ClientHome
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
          name: routeNames.ADMIN_LOGOUT,
          path: routeRoutes.ADMIN_LOGOUT,
          component: () => import('@/views/admin/admin-logout.vue')
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
            },
            {
              name: routeNames.ADMIN_CONFIG_BLOG_POSTS,
              path: routeRoutes.ADMIN_CONFIG_BLOG_POSTS,
              component: () => import('@/views/admin/admin-config-blog-posts.vue')
            },
            {
              name: routeNames.ADMIN_CONFIG_ROUTES,
              path: routeRoutes.ADMIN_CONFIG_ROUTES,
              component: () => import('@/views/admin/admin-config-routes.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
