<template>
  <div class="credential-field">
    <b-form class="credential-field__form" inline>
      <label class="mr-sm-2" :for="`inline-form-input-${field.fieldName}`">{{field.fieldName}}</label>
      <b-input
        :id="`inline-form-input-${field.fieldName}`"
        size="sm"
        v-model="data"
        :type="typeField"
      ></b-input>
      <span @click="() => { onClickEye(index) }">
        <i class="fas fa-eye" v-if="!field.show"></i>
        <i class="fas fa-eye-slash" v-else></i>
      </span>
    </b-form>
  </div>
</template>

<script>
  import { BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue'
  export default {
    computed: {
      typeField() {
        return this.field.show ? 'text' : 'password'
      },
      data() {
        return this.field.data
      }
    },
    methods: {
      onClickEye(index) {
        this.$emit('onToggleShowPass', index)
      }
    },
    props: {
      field: {
        required: true,
        type: Object
      },
      index: {
        required: true
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
  .credential-field {
    .fa-eye, .fa-eye-slash {
      cursor: pointer
    }

    label {
      width: 130px;
      justify-content: initial
    }

    input {
      margin-right: 10px
    }
  }
</style>