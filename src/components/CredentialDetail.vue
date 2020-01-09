<template>
  <div class="credential-detail">
    {{credentialDetail}}
  </div>
</template>

<script>
import {decryptDataObj, cryptDataObj} from '@/utils/cryptDecrypt'

export default {
  created(){
    this.credentialDetail = decryptDataObj(this.data)
  },
  data() {
    return {
      credentialDetail: {}
    }
  },
  beforeDestroy(){
    this.credentialDetail = cryptDataObj(this.credentialDetail)
  },
  props: {
    open: {
      required: true,
      type: Boolean
    },
    data: {
      required: true,
      type: String
    }
  }
}
</script>

<style style="scss">

</style>