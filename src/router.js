import Router from 'vue-router';
import Vue from 'vue'

import Layout from '@/components/Layout.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Welcome from '@/views/Welcome.vue';
import userStore from '@/store/user';
import { getToken, getTokenOrReject, removeToken } from '@/helpers/session'

Vue.use(Router)

const checkAuthentication = async (to, from, next) => {

  const isTokenInStore = !!userStore.state.user.token
  if (isTokenInStore) {
    next()
  } else {
    const token = getTokenOrReject()
    if (token) {
      try {
        await userStore.fetchUser(token)
        next()
      } catch (err) {
        removeToken()
        next('/login')
      }
    }
  }
}

const isAuth = (to, from, next) => {
  const token = getToken()
  if (token) {
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
      },
      {
        name: "welcome",
        path: '/welcome',
        component: Welcome
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