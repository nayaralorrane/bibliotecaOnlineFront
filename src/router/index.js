import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import axios from 'axios'

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
  },
  {
    path: '/livro/register',
    name: 'CadastroLivro',
    component: () => import('../views/RegisterLivro.vue')
  },
  {
    path: '/biblioteca/register',
    name: 'CadastroBiblioteca',
    component: () => import('../views/RegisterBiblioteca.vue')
  },
  {
    path: '/livro/consult',
    name: 'ConsultarLivro',
    component: () => import('../views/SearchLivro.vue')
  },
  {
    path: '/livro/consult/autor',
    name: 'ConsultarLivroAutor',
    component: () => import('../views/SearchLivroAutor.vue')
  },
  {
    path: '/livro/consult/categoria',
    name: 'ConsultarLivroCategoria',
    component: () => import('../views/SearchLivroCategoria.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.isLogged) axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`
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
