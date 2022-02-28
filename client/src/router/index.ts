import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        // TODO - Remove this line when other routes are added
        redirect: () => { return { name: 'Contact Us' } },
        children: [
            {
                path: 'about',
                name: 'About',
                component: () => import('../views/About.vue')
            },
            {
                path: 'contact-us',
                name: 'Contact Us',
                component: () => import('../views/ContactUs.vue')
            }
        ]
    }
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes
})

export default router
