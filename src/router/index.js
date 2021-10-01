import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from "@/views/AboutPage";
import ToDoPage from "@/views/ToDoPage";
import ToDoSinglePage from "@/components/ToDoSinglePage";
import ToDoPageStore from "@/views/ToDoPageStore";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/todos',
    name: 'ToDoS Page',
    component: ToDoPage
  },
  {
    path: '/about',
    name: 'About Page',
    component: AboutPage
  },
  {
    path: '/todos/:id',
    name: 'ToDo',
    component: ToDoSinglePage
  },
  {
    path: '/store',
    name: 'ToDos Page From Store',
    component: ToDoPageStore
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
