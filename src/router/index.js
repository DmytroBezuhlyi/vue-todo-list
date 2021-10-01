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
    name: 'ToDo Page',
    component: ToDoPageStore
  },
  {
    path: '/about',
    name: 'About Page',
    component: AboutPage
  },
  {
    path: '/todos/:id',
    name: 'ToDo Single Page',
    component: ToDoSinglePage
  },
  {
    path: '/home',
    name: 'Home Page',
    component: HomePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
