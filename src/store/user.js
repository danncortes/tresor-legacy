import uuid from 'uuid'
import store2 from 'store2'
import { loginUser, fetchUser, signupUser, logoutUser } from '@/services/user-service'
import router from '@/router'
import { getToken, removeToken } from '@/helpers/session';

const defaultUserState = {
  name: '',
  isAuth: false,
  token: '',
}

const defaultLoginState = {
  error: '',
  loading: false
}

const defaultSignUpState = {
  error: '',
  loading: false
}

export default {
  state: {
    user: {
      ...defaultUserState
    },
    login: {
      ...defaultLoginState
    },
    signUp: {
      ...defaultSignUpState
    }
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
      ...this.state.user,
      ...payload.user,
      isAuth: true,
      token: payload.token
    }
    sessionStorage.setItem('vault', JSON.stringify(payload))
  },
  logoutUser() {
    const token = getToken()
    logoutUser(token)
    removeToken()
    this.state.user = defaultUserState
    this.state.login = defaultLoginState
    this.state.signUp = defaultSignUpState
    router.push('/login')
  },
  setLoadingLogin(payload) {
    this.state.login = {
      ...this.state.login,
      loading: payload
    }
  },
  setErrorLogin(payload) {
    this.state.login = {
      ...this.state.login,
      error: payload
    }
  },
  setLoadingSignup(payload) {
    this.state.signUp = {
      ...this.state.signUp,
      loading: payload
    }
  },
  setErrorSignup(payload) {
    this.state.signUp = {
      ...this.state.signUp,
      error: payload
    }
  }
}