<template>
  <div>
    <CredentialListItem
      v-for="(credential, index) in localCredentials"
      v-bind:key="index"
      :credential="credential"
      @onClickCredential="() => toggleCred(index)"
    />
  </div>
</template>

<script>
import CredentialListItem from '@/components/CredentialListItem'

export default {
  data() {
    return {
      localCredentials: []
    }
  },
  props: {
    credentials: {
      type: Array,
      required: true
    }
  },
  created(){
    this.localCredentials = this.credentials.map(cred => ({
      ...cred,
      open: false
    }))
  },
  methods:{
    toggleCred (index) {
      this.localCredentials = this.localCredentials.map((cred, indx) => {
      if(index === indx) {
        cred.open = !cred.open
      }
      return cred
    })
    }
  },
  components: {
    CredentialListItem
  }
}
</script>

<style lang="scss">

</style>