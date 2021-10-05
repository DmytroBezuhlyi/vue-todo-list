import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from "@/views/AboutPage";
import ToDoSinglePage from "@/components/ToDoSinglePage";
import ToDoPageStore from "@/views/ToDoPageStore";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ToDoPage',
    component: ToDoPageStore
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  },
  {
    path: '/todos/:id',
    name: 'ToDoSinglePage',
    component: ToDoSinglePage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
