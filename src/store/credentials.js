import Vue from "vue";
import { fetchCredentials } from '@/services/credential-service'

export default Vue.observable({
  state: {
    credentials: [],
    errorCredentials: '',
    loadingCredentials: false
  },
  getCredentials: async function () {

    const vault = sessionStorage.getItem('vault')
    const { token } = vault && JSON.parse(vault)

    this.setErrorCredentials(false)
    this.setLoadingCredentials(true)

    try {
      const credentials = await fetchCredentials(token)
      this.setCredentials(credentials.data)
      this.setErrorCredentials(false)
    } catch (err) {
      this.setErrorCredentials('Error Loading Credentials')
      throw err
    } finally {
      this.setLoadingCredentials(false)
    }
  },
  setCredentials(payload) {
    this.state.credentials = payload
  },
  setLoadingCredentials(payload) {
    this.state.loadingCredentials = payload
  },
  setErrorCredentials(payload) {
    this.state.errorCredentials = payload
  }
})