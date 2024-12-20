import { createWebHistory, createRouter } from 'vue-router'
import Login from './pages/auth/Login.vue'
import Register from './pages/auth/Register.vue'
import VerifyOtp from './pages/auth/VerifyOtp.vue'
import VerifyEmail from './pages/auth/VerifyEmail.vue'
import UpdatePassword from './pages/auth/UpdatePassword.vue'
import Home from './pages/Home.vue'
import Role from './pages/Role.vue'
import User from './pages/user/User.vue'
import UserAdd from './pages/user/UserAdd.vue'
import Banner from './pages/banner/Banner.vue'
import BannerAdd from './pages/banner/BannerAdd.vue'
import Product from './pages/product/Product.vue'
import ProductAdd from './pages/product/ProductAdd.vue'
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
        name: 'UserAdd',
        path: '/user-add',
        component: UserAdd
    },
    {
        name: 'Banner',
        path: '/banner',
        component: Banner
    },
    {
        name: 'BannerAdd',
        path: '/banner-add',
        component: BannerAdd
    },
    {
        name: 'Product',
        path: '/product',
        component: Product
    },
    {
        name: 'ProductAdd',
        path: '/product-add',
        component: ProductAdd
    },
    {
        name: 'Role',
        path: '/role',
        component: Role
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
