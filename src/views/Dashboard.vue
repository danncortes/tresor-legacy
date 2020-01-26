<template>
  <div class="layout-in dashboard px-3 py-3">
    <b-container class="title-area">
      <b-row align-h="between" align-v="center" no-gutters>
        <b-col cols="auto">
          <h4 class="title" v-if="openNewCredential">New Credential</h4>
          <h4 class="title" v-else>Credentials</h4>
        </b-col>
        <b-col cols="auto">
          <b-button
            size="sm"
            v-b-toggle.new-credential
            v-if="openNewCredential">
              <i class="fas fa-times"></i> Cancel
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            v-b-toggle.new-credential
            v-else>
              <i class="fas fa-plus"></i> New
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <!-- New Credential -->
    <b-collapse id="new-credential" v-model="openNewCredential">
      <div class="dashboard__create-cred-container">
        <transition name="fadeCred">
          <CreateCredential
            v-if="openNewCredential"
            @onCredCreated="() => {this.openNewCredential = !this.openNewCredential}"
          />
        </transition>
      </div>
    </b-collapse>
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
import CreateCredential from '@/components/CreateCredential'
import { BCollapse, VBToggle, BContainer, BRow, BCol, BButton } from 'bootstrap-vue'

export default {
  created(){
    credentialStore.getCredentials()
  },
  data(){
    return {
      credentialState: credentialStore.state,
      openNewCredential: false
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
  directives: {
    'b-toggle': VBToggle
  },
  components: {
    CredentialsList,
    CreateCredential,
    BContainer,
    BRow,
    BCol,
    BButton,
    BCollapse
  }
}
</script>

<style lang="scss">
  .dashboard {
    .title-area {
      margin-bottom: 24px; 

      .title {
        margin-bottom: 0;
      }
    }
    .fadeCred-enter-active, .fadeCred-leave-active {
      transition: opacity .5s;
    }
    .fadeCred-enter, .fadeCred-leave-to {
      opacity: 0;
    }

    &__create-cred-container {
      min-height: 325px
    }
  }


</style>