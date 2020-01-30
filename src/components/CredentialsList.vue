<template>
  <div class="credential-list">
    <b-container class="credential-list__header mb-2" fluid>
      <b-row>
        <b-col cols="5">Name</b-col>
        <b-col cols="3">Updated At</b-col>
        <b-col cols="3">Created At</b-col>
        <b-col cols="1">
          <i class="fas fa-angle-left"></i>
        </b-col>
      </b-row>
    </b-container>
    <CredentialListItem
      v-for="(credential, index) in localCredentials"
      v-bind:key="index"
      :credential="credential"
      @onClickCredential="() => toggleCred(index)"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import CredentialListItem from '@/components/CredentialListItem'
import { BContainer, BRow, BCol } from 'bootstrap-vue'

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
    this.buildLocalCredentials()
  },
  watch: {
    credentials(newValue){
      newValue && this.buildLocalCredentials()
    }
  },
  methods:{
    buildLocalCredentials(){
      const newCredentials = cloneDeep(this.credentials)
      this.localCredentials = newCredentials.map(cred => ({
        ...cred,
        open: false
      }))
    },
    toggleCred (index) {
      const newCredentials = cloneDeep(this.localCredentials)
      this.localCredentials = newCredentials.map((cred, indx) => {
        if(index === indx) {
          cred.open = !cred.open
        }
        return cred
      })
    }
  },
  components: {
    CredentialListItem,
    BContainer,
    BRow,
    BCol
  }
}
</script>

<style lang="scss">
  .credential-list {
    &__header {
      font-size: 14px;
    }
  }
</style>