import Vue from "vue";
import { fetchCredentials, saveCredential } from '@/services/credential-service'

const credentialStatus = {
  id: '',
  processing: false,
  error: false
}

export default Vue.observable({
  state: {
    credentials: [],
    errorCredentials: '',
    loadingCredentials: false,
    credentialStatus
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
  createCredential: async function (credential) {

    const vault = sessionStorage.getItem('vault')
    const { token } = vault && JSON.parse(vault)

    this.setErrorCredential(false)
    this.setProcessingCredential(true)

    try {
      const newCredential = await saveCredential(token, credential)

      this.setCredentials([
        newCredential.data,
        ...this.state.credentials
      ])
      this.setErrorCredential(false)
      return newCredential
    } catch (err) {
      this.setErrorCredential('Error saving Credentials')
      throw err
    } finally {
      this.setProcessingCredential(false)
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
  },
  setProcessingCredential(processing, id = "") {
    this.state.credentialStatus = {
      id,
      processing,
      error: false
    }
  },
  setErrorCredential(error, id = "") {
    this.state.credentialStatus = {
      id,
      processing: false,
      error
    }
  }
})