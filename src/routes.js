import {createWebHistory, createRouter} from 'vue-router'
import Login from './components/auth/Login.vue'
import VerifyOtp from './components/auth/VerifyOtp.vue'
import VerifyEmail from './components/auth/VerifyEmail.vue'
import UpdatePassword from './components/auth/UpdatePassword.vue'
import Home from './components/Home.vue'
import PageNotFound from './components/PageNotFound.vue'

const routes = [
    {
        name: 'Login',
        path: '/',
        component: Login
    },
    {
        name: 'VerifyEmail',
        path: '/verifyemail',
        component: VerifyEmail
    },
    {
        name: 'VerifyOtp',
        path: '/verifyotp',
        component: VerifyOtp
    },
    {
        name: 'UpdatePassword',
        path: '/updatepassword',
        component: UpdatePassword
    },
    {
        name: 'Home',
        path: '/home',
        component: Home
    },
    {
        name: 'PageNotFound',
        path: '/:pathMatch(.*)*',
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
