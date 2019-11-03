import Router from 'vue-router';
import Vue from 'vue'
import ls from 'store2'

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
    const vault = ls('vault');
    const tokeFromLs = vault && vault.token
    if (tokeFromLs) {
      try {
        await userStore.fetchUser(tokeFromLs)
        next()
      } catch (err) {
        ls('vault', {})
        next('/login')
      }
    } else {
      next('/login')
    }
  }
}

const isAuth = (to, from, next) => {
  const vault = ls('vault');
  const tokeFromLs = vault && vault.token
  if (tokeFromLs) {
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
        path: '/login',
        component: Login,
        beforeEnter: isAuth
      },
      {
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: checkAuthentication
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  routes
})