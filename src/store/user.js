import uuid from 'uuid'
import store2 from 'store2'
import { loginUser, fetchUser, signupUser, logoutUser } from '@/services/user-service'
import router from '@/router'
import { getToken } from '@/helpers/session';

const defaultState = {
  user: {
    name: ''
  },
  isAuth: false
}

export default {
  state: {
    user: {
      name: ''
    },
    errorLogin: '',
    loadingLogin: false,
    errorSignup: '',
    loadingSignup: false,
    isAuth: false
  },
  fetchUser: async function (token) {
    return fetchUser(token).then(user => {
      this.setUser({ user: user.data, token })
    })
  },
  loginUser: async function (form) {
    this.setErrorLogin(false)
    this.setLoadingLogin(true)
    try {
      const user = await loginUser(form)
      this.setUser(user.data)
      store2('masterp', form.masterp)
      router.push('/dashboard')
      this.setErrorLogin(false)
    } catch (err) {
      this.setErrorLogin('Error Login In')
      throw err
    } finally {
      this.setLoadingLogin(false)
    }
  },
  signupUser: async function (email, password) {
    this.setErrorSignup(false)
    this.setLoadingSignup(true)
    const masterp = uuid()
    const form = {
      email, password, masterp
    }
    try {
      const user = await signupUser(form)
      store2('masterp', masterp)
      this.setUser(user.data)
      router.push({ name: 'welcome', params: { masterp } })
      this.setErrorSignup(false)
    } catch (err) {
      this.setErrorSignup('Error Signing Up!')
      throw err
    } finally {
      this.setLoadingSignup(false)
    }
  },
  setUser(payload) {
    this.state.user = {
      ...payload.user,
      token: payload.token
    }
    this.state.isAuth = true
    sessionStorage.setItem('vault', JSON.stringify(payload))
  },
  logoutUser() {
    const token = getToken()
    logoutUser(token)
    sessionStorage.removeItem('vault')
    this.state.user = { ...defaultState.user }
    this.state.isAuth = false
    router.push('/login')
  },
  setLoadingLogin(payload) {
    this.state.loadingLogin = payload
  },
  setErrorLogin(payload) {
    this.state.errorLogin = payload
  },
  setLoadingSignup(payload) {
    this.state.loadingSignup = payload
  },
  setErrorSignup(payload) {
    this.state.errorSignup = payload
  }
}