import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from "@/views/AboutPage";
import ToDoSinglePage from "@/components/ToDoSinglePage";
import ToDoPage from "@/views/ToDoPage";
import LoginPage from "@/views/LoginPage";
import store from "@/store/index.js";
import cookies from 'vue-cookies';
import RegistrationPage from "@/views/RegistrationPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/todos',
        name: 'ToDosPage',
        component: ToDoPage,
        beforeEnter: (to, from, next) => {
            if (cookies.isKey('token')) {
                next();
            } else {
                next({name: 'LoginPage'});
            }
        }
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage,
    },
    {
        path: '/todos/:id',
        name: 'ToDoSinglePage',
        component: ToDoSinglePage,
    },
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            if (cookies.isKey('token')) {
                next(false);
            } else {
                next();
            }
        },
    },
    {
        path: '/registration',
        name: 'RegistrationPage',
        component: RegistrationPage,
        beforeEnter: (to, from, next) => {
            if (!store.getters.getIsAuth === false) {
                next(false);
            } else {
                next();
            }
        },
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
