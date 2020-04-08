import store2 from 'store2'
import router from '@/router'

export default {
  mounted() {
    if (!this.masterp) {
      sessionStorage.removeItem('vault')
      router.push('/login')
    }
  },
  data() {
    return {
      masterp: store2('masterp')
    }
  },

}