import { cloneDeep } from 'lodash';

export default {
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
        if (equalFieldName > 1) {
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
    cleanFields() {
      const fields = cloneDeep(this.newCredential.fields)
      return fields.map(field => {
        delete field['valid']
        delete field['plusButton']
        delete field['minusButton']
        return field
      })
    }
  },
  watch: {
    fieldLength(newValue) {
      if (newValue) {
        const credentialCopy = cloneDeep(this.newCredential)
        let newFields = cloneDeep(credentialCopy.fields)

        newFields.forEach(field => {
          field.plusButton = false
          field.minusButton = true
        })
        newFields[newValue - 1].plusButton = true
        if (newValue === 1) {
          newFields[0].minusButton = false
        }
        credentialCopy.fields = newFields
        this.newCredential = credentialCopy
      }
    }
  },
  computed: {
    fieldLength() {
      return this.newCredential.fields ? this.newCredential.fields.length : 0
    }
  }
}