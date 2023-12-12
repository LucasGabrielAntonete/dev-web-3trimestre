import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/forgotpassword',
      name: 'forgotPasswordView',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/registro',
      name: 'registroView',
      component: () => import('../views/RegistroView.vue')
    },
    {
      path: '/main',
      name: 'mainView',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/movies',
      name: 'moviesView',
      component: () => import('../views/MoviesView.vue')
    }
  ]
})

export default router
