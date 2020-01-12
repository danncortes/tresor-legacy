<template>
  <div class="credential-field">
    <b-form class="credential-field__form" inline>
      <label class="mr-sm-2" :for="`inline-form-input-${field.fieldName}`">{{field.fieldName}}</label>
      <b-input
        :id="`inline-form-input-${field.fieldName}`"
        size="sm"
        v-model="data"
      ></b-input>
    </b-form>
  </div>
</template>

<script>
  import { BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue'
  export default {
    data() {
      return {
        data: this.field.data
      }
    },
    props: {
      field: {
        required: true,
        type: Object
      }
    },
    components: {
      BButton,
      BForm,
      'b-input': BFormInput,
      BFormGroup
    },
  }
</script>

<style lang="scss">
</style>