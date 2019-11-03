import { loginUser, fetchUser } from '@/services/user-service'
import router from '@/router'
import ls from 'store2'

export default {
  state: {
    user: {
      name: ''
    }
  },
  fetchUser: async function (token) {
    return fetchUser(token).then(user => {
      this.setUser({ user: user.data, token })
    })
  },
  loginUser: async function (form) {
    try {
      const user = await loginUser(form)
      this.setUser(user.data)
      ls('vault', user.data)
      router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  },
  setUser(payload) {
    this.state.user = {
      ...payload.user,
      token: payload.token
    }
  }
}