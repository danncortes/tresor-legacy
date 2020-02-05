import Router from 'vue-router';
import Vue from 'vue'

import Layout from '@/components/Layout.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import userStore from '@/store/user';

Vue.use(Router)

const checkAuthentication = async (to, from, next) => {

  const isTokenInStore = !!userStore.state.user.token
  if (isTokenInStore) {
    next()
  } else {
    const vault = sessionStorage.getItem('vault')
    const tokenFromSs = vault && JSON.parse(vault).token
    if (tokenFromSs) {
      try {
        await userStore.fetchUser(tokenFromSs)
        next()
      } catch (err) {
        sessionStorage.removeItem('vault')
        next('/login')
      }
    } else {
      next('/login')
    }
  }
}

const isAuth = (to, from, next) => {
  const vault = sessionStorage.getItem('vault')
  const tokenFromSs = vault && JSON.parse(vault).token
  if (tokenFromSs) {
    next(from.path)
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: Layout,
    beforeEnter: (to, from, next) => {
      if (to.path === '/') {
        next('/dashboard')
      } else {
        next()
      }
    },
    children: [
      {
        name: "login",
        path: '/login',
        component: Login,
        beforeEnter: isAuth
      },
      {
        name: "dashboard",
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: checkAuthentication
      }
    ]
  }
]

const base = process.env.NODE_ENV === 'production' ? '/vault/' : '/'

export default new Router({
  mode: 'history',
  base,
  routes
})