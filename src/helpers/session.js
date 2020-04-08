import router from '@/router'

export default () => {
  try {
    const vault = sessionStorage.getItem('vault')
    const { token } = vault && JSON.parse(vault)
    return token
  } catch (err) {
    router.push('/login')
  }
}