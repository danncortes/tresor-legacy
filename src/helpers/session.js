import router from '@/router'

const getToken = () => {
  try {
    const vault = sessionStorage.getItem('vault')
    const { token } = vault && JSON.parse(vault)
    return token
  } catch (err) {
    return null
  }
}

const getTokenOrReject = () => {
  try {
    const vault = sessionStorage.getItem('vault')
    const { token } = vault && JSON.parse(vault)
    return token
  } catch (err) {
    router.push('/login')
    return null
  }
}

const removeToken = () => {
  sessionStorage.removeItem('vault')
}

const removeTokenAndReject = () => {
  sessionStorage.removeItem('vault')
  router.push('/login')
}

export {
  getToken,
  getTokenOrReject,
  removeToken,
  removeTokenAndReject
}