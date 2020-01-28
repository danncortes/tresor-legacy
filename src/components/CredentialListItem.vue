<template>
  <div class="credential-list-item">
    <div
      class="credential-list-item__bar px-2 py-3"
      @click="onClickCredential"
      v-b-toggle="credential._id"
    >
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="5">{{credential.name}}</b-col>
          <b-col cols="3">{{credential.updatedAt | format('DD-MM-YYYY HH:mm')}}</b-col>
          <b-col cols="3">{{credential.createdAt | format('DD-MM-YYYY HH:mm')}}</b-col>
          <b-col cols="1">
            <i class="fas fa-angle-down" v-if="credential.open"></i>
            <i class="fas fa-angle-left" v-else></i>
          </b-col>
        </b-row>
      </b-container>
    </div>
    
    <b-collapse :id="credential._id">
        <div>
          <b-form
            @submit.prevent="saveCredential" 
            v-if="isEdit"
          >
            <CredentialForm
              :credential="newCredential"
              :processing="processing"
              @cancel="cancel"
              @addField="addField"
              @removeField="(index) => { removeField(index) }"
              @onChangeFieldName="(value, index) => { updateFieldName(value, index) }"
              @onChangeData="(value, index) => { updateData(value, index) }"
              @onSelectTypeChange="(value, index) => { updateType(value, index) }"
            />
          </b-form>
          <transition v-else name="fade">
            <CredentialDetail
              class="credential-list-item__collapsable-area px-4 pt-4 pb-2"
              v-if="credential.open"
              :open="credential.open"
              :data="credential.data"
            />
          </transition>
          <b-container class="credential-list-item__controls mb-4">
            <b-row align-h="between" align-v="center">
              <b-col cols="auto">
              </b-col>
              <b-col cols="auto">
                <b-button
                  class=""
                  variant="primary"
                  size="sm"
                  @click="onClickEdit"
                  v-if="!isEdit"
                >
                  <i class="fas fa-pencil-alt"></i>
                  Edit
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </div>
    </b-collapse>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { decryptDataObj } from '@/utils/cryptDecrypt'
import { BCollapse, VBToggle, BContainer, BRow, BCol, BButton, BForm } from 'bootstrap-vue'
import CredentialDetail from '@/components/CredentialDetail'
import CredentialForm from '@/components/CredentialForm'
import CredentialFormMixin from '@/mixins/CredentialFormMixin'
import credentialStore from '@/store/credentials'
import { cryptDataObj } from '@/utils/cryptDecrypt'

export default {
  mixins: [CredentialFormMixin],
  data() {
    return {
      isEdit: false,
      newCredential: {},
      credentialState: credentialStore.state
    }
  },
  props: {
    credential: {
      required: true,
      type: Object
    }
  },
  methods: {
    cancel() {
      this.isEdit = false
    },
    onClickCredential(){
      this.$emit('onClickCredential')
    },
    onClickEdit() {
      this.isEdit = true
    },
    buildNewCredential(credential) {
      const credentialCopy = cloneDeep(credential)
      credentialCopy.data = decryptDataObj(credentialCopy.data)
      return {
        id: credentialCopy._id,
        name: credentialCopy.name,
        fields: credentialCopy.data.map(field => ({
          ...field,
          valid: null,
          minusButton: true,
          plusButton: false
        }))
      }
    },
    saveCredential(){
      const credential = {
        name: this.newCredential.name,
        data: cryptDataObj(this.cleanFields())
      }

      // Create credential
      credentialStore.updateCredential(credential, this.newCredential.id).then(() => {
        this.cancel()
        this.$emit('onClickCredential')
      })
    }
  },
  computed: {
    processing() {
      return this.credential._id === this.credentialState.credentialStatus.id
    }
  },
  watch: {
    isEdit(newValue) {
      if(newValue) {
        this.newCredential = this.buildNewCredential(this.credential)
      }
    }
  },
  directives: {
    'b-toggle': VBToggle
  },
  components: {
    BCollapse,
    BContainer,
    BRow,
    BCol,
    CredentialDetail,
    BButton,
    BForm,
    CredentialForm
  }
}
</script>

<style lang="scss">
  .credential-list-item {
    &__bar {
      border-top: 1px solid #e5e5e5;
      cursor: pointer;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>