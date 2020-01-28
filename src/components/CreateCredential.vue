<template>
  <div class="create-credential">
    <b-form @submit.prevent="saveCredential">
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
    <h4 class="create-credential__title-backup ml-3 mb-3">Credentials</h4>
  </div>
</template>

<script>
import { BForm } from 'bootstrap-vue'
import { userName, password } from '@/constants/fieldsTemplate'
import CredentialForm from '@/components/CredentialForm'
import credentialStore from '@/store/credentials'
import { cryptDataObj } from '@/utils/cryptDecrypt'
import CredentialFormMixin from '@/mixins/CredentialFormMixin';

export default {
  mixins: [CredentialFormMixin],
  data() {
    return {
      newCredential: {
        name: '',
        fields: [
          {
            ...userName,
            valid: null,
            minusButton: true,
            plusButton: false
          },
          {
            ...password,
            valid: null,
            minusButton: true,
            plusButton: true
          }
        ]
      },
      edit: true,
      credentialState: credentialStore.state
    }
  },
  methods: {
    cancel() {
      this.$emit('cancelCreate')
    },
    saveCredential() {
      const credential = {
        name: this.newCredential.name,
        data: cryptDataObj(this.cleanFields())
      }

      // Create credential
      credentialStore.createCredential(credential).then(() => {
        // Collapse create credential
        this.$emit('onCredCreated')
      })
      
    }
  },
  computed: {
    processing() {
      return this.credentialState.credentialStatus.processing
    }
  },
  components: {
    BForm,
    CredentialForm
  }
}
</script>