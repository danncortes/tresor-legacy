import store2 from 'store2'
import { removeTokenAndReject } from '@/helpers/session'

export default {
  mounted() {
    if (!this.masterp) {
      removeTokenAndReject()
    }
  },
  data() {
    return {
      masterp: store2('masterp')
    }
  },

}