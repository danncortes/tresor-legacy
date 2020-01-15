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
import { decryptDataObj, cryptDataObj } from '@/utils/cryptDecrypt'
import CredentialField from '@/components/CredentialField'

export default {
  created(){
    this.credentialDetail = decryptDataObj(this.data)

    const credArray = []
    for(let key in this.credentialDetail) {
      credArray.push({
        fieldName: key,
        data: this.credentialDetail[key],
        show: false
      })
    } 
    this.credentialDetailArray = [...credArray]
  },
  data() {
    return {
      credentialDetail: {},
      credentialDetailArray: []
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

<style lang="scss">
  .credential-detail {
    .credential-field:not(:last-child) {
      margin-bottom: 14px;
    }
  }
</style>