<template>
  <div class="layout-in">
    <h4>Credentials</h4>
    <div v-if="loadingCredentials">
      Loading...
    </div>
    <div v-else-if="errorCredentials">
      {{errorCredentials}}
    </div>
    <div v-else>
      <CredentialsList :credentials="credentials"/>
    </div>
  </div>
</template>

<script>
import credentialStore from '@/store/credentials'
import CredentialsList from '@/components/CredentialsList'

export default {
  created(){
    credentialStore.getCredentials()
  },
  data(){
    return {
      credentialState: credentialStore.state,
    }
  },
  computed: {
    credentials() {
      return this.credentialState.credentials
    },
    errorCredentials() {
      return this.credentialState.errorCredentials
    },
    loadingCredentials() {
      return this.credentialState.loadingCredentials
    }
  },
  components: {
    CredentialsList
  }
}
</script>