<template>
  <div class="credential-detail">
    <CredentialField
      v-for="(field, key) in credentialDetailArray"
      :field="field"
      v-bind:key="key"
    />
  </div>
</template>

<script>
import { decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import CredentialField from '@/components/CredentialField'

export default {
  created(){
    this.credentialDetail = decryptDataObj(this.data)

    const credArray = []
    for(let key in this.credentialDetail) {
      credArray.push({
        fieldName: key,
        data: this.credentialDetail[key]
      })
      this.credentialDetailArray = [...credArray]
    } 
  },
  data() {
    return {
      credentialDetail: {},
      credentialDetailArray: []
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
  },
  components: {
    CredentialField
  }
}
</script>

<style style="scss">

</style>