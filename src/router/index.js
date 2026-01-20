import {createRouter, createWebHistory} from 'vue-router'
import IndexView from '../views/IndexView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: IndexView,
        },
        {
            path: '/registration',
            name: 'registration',
            component: RegistrationView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
    ],
})

export default router
