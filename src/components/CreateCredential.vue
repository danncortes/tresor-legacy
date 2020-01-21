<template>
  <div class="create-credential">
    <div class="create-credential__box">
      <b-input
        size="sm"
        v-model="credentialName"
        placeholder="Enter a name"
        class="create-credential__credential-name ml-3 mb-3"
      ></b-input>
      <CredentialField
        v-for="(field, key) in fields"
        v-bind:key="key"
        :field="field"
        :index="key"
        :edit="edit"
        :fieldNameValid="field.valid"
        :plusButton="plusButton(key)"
        :minusButton="minusButton(key)"
        @onChangeFieldName="(val) => { updateFieldName(val, key) }"
        @onChangeData="(val) => { updateData(val, key) }"
        @onSelectTypeChange="(type) => { updateType(type, key) }"
        @onClickRemove="() => removeField(key)"
        @onClickAdd="addField"
      />
      <b-container class="create-credential__controls">
        <b-row align-h="end" align-v="start" no-gutters>
          <b-col cols="auto">
            <b-button class="create-credential__cancel-btn" variant="default" size="sm">
              Cancel
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              @click.prevent="saveCredential"
              :disabled="processing"
            >
              <span v-if="processing">
                <b-spinner
                  small
                  label="Spinning"
                ></b-spinner>
                Saving...
              </span>
              <span v-else>
                Save <i class="fas fa-save"></i>
              </span>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <h4 class="create-credential__title-backup">Credentials</h4>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import CredentialField from '@/components/CredentialField'
import { userName, password } from '@/constants/fieldsTemplate'
import { BContainer, BRow, BCol, BButton, BFormInput, BSpinner } from 'bootstrap-vue'
import credentialStore from '@/store/credentials'
import { cryptDataObj } from '@/utils/cryptDecrypt'

export default {
  created() {
    this.fields = [
      {
        ...userName,
        valid: null
      },
      {
        ...password,
        valid: null
      }
    ]
  },
  data() {
    return {
      credentialName: '',
      fields: [],
      edit: true,
      credentialState: credentialStore.state
    }
  },
  methods: {
    updateFieldName(value, index) {
      const newFields = [...this.fields]
      newFields[index].fieldName = value
      this.fields = [...newFields]
      this.checkValidFieldName()
    },
    updateData(value, index) {
      const newFields = [...this.fields]
      newFields[index].data = value
      this.fields = [...newFields]
    },
    updateType(type, index) {
      const newFields = [...this.fields]
      newFields[index].type = type
      this.fields = [...newFields]
    },
    plusButton(key) {
      return key+1 === this.fields.length
    },
    minusButton() {
      return this.fields.length > 1
    },
    checkValidFieldName() {
      const newFields = [...this.fields]
      newFields.forEach((field) => {
        const equalFieldName = newFields.filter(fild => fild.fieldName !== '' && fild.fieldName === field.fieldName).length
        if(equalFieldName > 1) {
          field.valid = false
        } else {
          field.valid = null
        }
      })
      this.fields = [...newFields]
    },
    removeField(index) {
      const newFields = [...this.fields]
      newFields.splice(index, 1)
      this.fields = [...newFields]
    },
    addField() {
      const newFields = [...this.fields]
      newFields.push({
        fieldName: '',
        data: '',
        type: 'text',
        valid: null
      })
      this.fields = [...newFields] 
    },
    saveCredential() {
      const fields = cloneDeep(this.fields)
      const data = fields.map(field => {
        delete field['valid']
        return field
      })

      const credential = {
        name: this.credentialName,
        data: cryptDataObj(data)
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
    CredentialField,
    BContainer,
    BRow,
    BCol,
    BButton,
    'b-input': BFormInput,
    BSpinner
  }
}
</script>

<style lang="scss" scoped>
  .create-credential {
    &__box {
      padding: 24px 10px 20px;
      background-color: #f2f2f2;
      border-radius: 3px;
      box-shadow: 0px 0px 3px rgba(0,0,0,.05) inset;
      margin-bottom: 40px;
    }

    &__credential-name {
      width: 200px;
    }

    &__controls {
      margin-top: 30px
    }

    &__cancel-btn {
      margin-right: 10px;
    }

    &__title-backup {
      margin: 0 0 30px 16px;
    }
  }
</style>