<template>
  <div class="create-credential">
    <b-form @submit.prevent="saveCredential">
      <CredentialForm
        :credential="newCredential"
        :processing="processing"
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
import { cloneDeep } from 'lodash';
import { BForm } from 'bootstrap-vue'
import { userName, password } from '@/constants/fieldsTemplate'
import CredentialForm from '@/components/CredentialForm'
import credentialStore from '@/store/credentials'
import { cryptDataObj } from '@/utils/cryptDecrypt'

export default {
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
    updateFieldName(value, index) {
      const credentialCopy = cloneDeep(this.newCredential)
      credentialCopy.fields[index].fieldName = value
      this.newCredential = credentialCopy
      this.checkValidFieldName()
    },
    updateData(value, index) {
      const credentialCopy = cloneDeep(this.newCredential)
      credentialCopy.fields[index].data = value
      this.newCredential = credentialCopy
    },
    updateType(value, index) {
      const credentialCopy = cloneDeep(this.newCredential)
      credentialCopy.fields[index].type = value
      this.newCredential = credentialCopy
    },
    checkValidFieldName() {
      const credentialCopy = cloneDeep(this.newCredential)
      let newFields = cloneDeep(credentialCopy.fields)
      newFields.forEach((field) => {
        const equalFieldName = newFields.filter(fild => fild.fieldName !== '' && fild.fieldName === field.fieldName).length
        if(equalFieldName > 1) {
          field.valid = false
        } else {
          field.valid = null
        }
      })
      credentialCopy.fields = newFields
      this.newCredential = credentialCopy
    },
    removeField(index) {
      const credentialCopy = cloneDeep(this.newCredential)
      let newFields = cloneDeep(credentialCopy.fields)
      newFields.splice(index, 1)
      credentialCopy.fields = newFields
      this.newCredential = credentialCopy
    },
    addField() {
      const credentialCopy = cloneDeep(this.newCredential)
      credentialCopy.fields = [
        ...credentialCopy.fields,
        {
          fieldName: '',
          data: '',
          type: 'text',
          valid: null
        }
      ]
      this.newCredential = credentialCopy
    },
    saveCredential() {
      const fields = cloneDeep(this.newCredential.fields)
      const data = fields.map(field => {
        delete field['valid']
        delete field['plusButton']
        delete field['minusButton']
        return field
      })

      const credential = {
        name: this.newCredential.name,
        data: cryptDataObj(data)
      }

      // Create credential
      credentialStore.createCredential(credential).then(() => {
        // Collapse create credential
        this.$emit('onCredCreated')
      })
      
    }
  },
  watch: {
    fieldLength(newValue){
      if(newValue) {
        const credentialCopy = cloneDeep(this.newCredential)
        let newFields = cloneDeep(credentialCopy.fields)
        
        newFields.forEach(field => {
          field.plusButton = false
          field.minusButton = true
        })
        newFields[newValue - 1].plusButton = true
        if(newValue === 1) {
          newFields[0].minusButton = false
        }
        credentialCopy.fields = newFields
        this.newCredential = credentialCopy
      }
    }
  },
  computed: {
    fieldLength() {
      return this.newCredential.fields.length
    },
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