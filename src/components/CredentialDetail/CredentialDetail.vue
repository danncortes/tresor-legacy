<template>
  <div class="credential-detail">
    <div v-if="masterpError" class="d-flex justify-content-center credential-detail__error">
        <b-alert show variant="danger text-center">There was an error decripting this credential</b-alert>
    </div>
    <CredentialField
      v-else
      v-for="(field, key) in credentialDetailArray"
      :field="field"
      :index="key"
      v-bind:key="key"
      @onToggleShowPass="onToggleShowPass"
    />
  </div>
</template>

<script>
import { decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import CredentialField from '@/components/CredentialField/CredentialField.vue'
import { BAlert } from 'bootstrap-vue'
import MasterP from '@/mixins/MasterP'

export default {
  mixins: [MasterP],
  created(){
    try{
      this.credentialDetail = decryptDataObj(this.data, this.masterp)
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
    } catch(err) {
      this.masterpError = true
    }
  },
  data() {
    return {
      credentialDetail: {},
      credentialDetailArray: [],
      masterpError: false
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
    this.credentialDetail = cryptDataObj(this.credentialDetail, this.masterp)
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
    CredentialField,
    BAlert
  }
}
</script>