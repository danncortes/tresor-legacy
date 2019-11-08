import uuid from 'uuid'
import store2 from 'store2'
import { loginUser, fetchUser, signupUser } from '@/services/user-service'
import router from '@/router'

export default {
  state: {
    user: {
      name: ''
    },
    errorLogin: '',
    loadingLogin: false,
    errorSignup: '',
    loadingSignup: false
  },
  fetchUser: async function (token) {
    return fetchUser(token).then(user => {
      this.setUser({ user: user.data, token })
    })
  },
  loginUser: async function (form) {
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
    this.setLoadingSignup(true)
    const masterp = uuid()
    const form = {
      email, password, masterp
    }
    try {
      const user = await signupUser(form)
      store2('masterp', masterp)
      this.setUser(user.data)
      router.push('/dashboard')
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
    sessionStorage.setItem('vault', JSON.stringify(payload))
  },
  setLoadingLogin(payload) {
    this.state.loadingLoging = payload
  },
  setErrorLogin(payload) {
    this.state.errorLogin = payload
  },
  setLoadingSignup(payload) {
    this.state.loadingLoging = payload
  },
  setErrorSignup(payload) {
    this.state.errorLogin = payload
  }
}