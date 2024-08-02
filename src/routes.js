import {createWebHistory, createRouter} from 'vue-router'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import VerifyOtp from './components/auth/VerifyOtp.vue'
import VerifyEmail from './components/auth/VerifyEmail.vue'
import UpdatePassword from './components/auth/UpdatePassword.vue'
import Home from './components/Home.vue'
import User from './components/User.vue'
import PageNotFound from './components/PageNotFound.vue'

const routes = [
    {
        name: 'Login',
        path: '/',
        component: Login
    },
    {
        name: 'Register',
        path: '/register',
        component: Register
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
        name: 'User',
        path: '/user',
        component: User
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
