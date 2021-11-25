import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.token) {
    if (to.name === 'Login' || to.name === 'Register') {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    if (to.name === 'Login' || to.name === 'Register') {
      next({ name: 'Home' })
    }
  }
  next()
})

export default router
