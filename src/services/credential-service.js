import axios from 'axios'

const { VUE_APP_API_URL } = process.env

const fetchCredentials = (token) => {
  return axios.get(`${VUE_APP_API_URL}/cred`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
}

const saveCredential = (token, data) => {
  return axios.post(`${VUE_APP_API_URL}/cred`,
    data,
    {
      headers: { 'Authorization': `Bearer ${token}` },
    }
  )
}

export {
  fetchCredentials,
  saveCredential
}