import axios from 'axios'

const { VUE_APP_API_URL } = process.env

const loginUser = ({ email, password, masterp }) => {
  return axios.post(`${VUE_APP_API_URL}/auth/login`,
    {
      email,
      password,
      masterp
    }
  )
}

const signupUser = ({ email, password, masterp }) => {
  return axios.post(`${VUE_APP_API_URL}/users`,
    {
      email,
      password,
      masterp
    }
  )
}

const fetchUser = (token) => {
  return axios.get(`${VUE_APP_API_URL}/auth/user`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
}

const logoutUser = (token) => {
  return axios.post(`${VUE_APP_API_URL}/auth/logoutAll`,
    {},
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  )
}

export {
  loginUser,
  fetchUser,
  signupUser,
  logoutUser
}