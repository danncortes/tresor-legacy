<template>
  <div class="credential-detail">
    <CredentialField
      v-for="(field, key) in credentialDetailArray"
      :field="field"
      :index="key"
      v-bind:key="key"
      @onToggleShowPass="onToggleShowPass"
    />
  </div>
</template>

<script>
import store2 from 'store2'
import { decryptData, decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import CredentialField from '@/components/CredentialField/CredentialField.vue'

export default {
  created(){
    let masterp = store2('masterp')
    masterp = masterp && decryptData(`${masterp}`)

    this.credentialDetail = decryptDataObj(this.data, masterp)

    const newCredentialDetail = this.credentialDetail.map(cred => {
      if(cred.type === 'userName' || cred.type === 'password') {
        return {
          ...cred,
          show: false
        }
      }
      return cred
    })

    this.credentialDetailArray = [...newCredentialDetail]
  },
  data() {
    return {
      credentialDetail: {},
      credentialDetailArray: [],
    }
  },
  methods: {
    onToggleShowPass(index){
      const newCreds = [...this.credentialDetailArray]
      newCreds[index].show = !newCreds[index].show
      this.credentialDetailArray = [...newCreds]
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