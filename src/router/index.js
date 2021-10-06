import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from "@/views/AboutPage";
import ToDoSinglePage from "@/components/ToDoSinglePage";
import ToDoPage from "@/views/ToDoPage";
import LoginPage from "@/views/LoginPage";
import store from '@/store/index.js';

Vue.use(VueRouter)

const routes = [
    {
        path: '/todos',
        name: 'ToDosPage',
        component: ToDoPage,
        beforeEnter: (to, from, next) => {
            if (store.getters.getIsAuth === false) {
                next({name: 'LoginPage'});
            } else {
                next();
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
