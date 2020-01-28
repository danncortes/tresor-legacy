import axios from 'axios'

const { VUE_APP_API_URL } = process.env

const fetchCredentials = (token) => {
  return axios.get(`${VUE_APP_API_URL}/cred`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
}

const createCredential = (token, data) => {
  return axios.post(`${VUE_APP_API_URL}/cred`,
    data,
    {
      headers: { 'Authorization': `Bearer ${token}` },
    }
  )
}

const updateCredential = (token, data, id) => {
  return axios.patch(`${VUE_APP_API_URL}/cred/${id}`,
    data,
    {
      headers: { 'Authorization': `Bearer ${token}` },
    }
  )
}

const deleteCredential = (token, id) => {
  return axios.delete(`${VUE_APP_API_URL}/cred/${id}`,
    {
      headers: { 'Authorization': `Bearer ${token}` },
    }
  )
}

export {
  fetchCredentials,
  createCredential,
  updateCredential,
  deleteCredential
}