<template>
  <div class="credential-field">
    <b-form class="credential-field__form" inline>
      <label class="mr-sm-2" :for="`inline-form-input-${field.fieldName}`">{{field.fieldName}}</label>
      <b-input
        :id="`inline-form-input-${field.fieldName}`"
        size="sm"
        v-model="data"
        :type="typeField"
        readonly
      ></b-input>
      <b-button variant="outline-secondary" size="sm" v-if="showEye" @click="() => { onClickEye(index) }">
        <i class="fas fa-eye" v-if="!field.show"></i>
        <i class="fas fa-eye-slash" v-else></i>
      </b-button>
      <b-button variant="outline-primary" size="sm">
        <i class="far fa-copy"></i>
      </b-button>
      <b-button v-if="field.type === 'email'" variant="outline-primary" size="sm">
        <i class="far fa-envelope"></i>
      </b-button>
      <b-button v-else-if="field.type === 'address'" variant="outline-primary" size="sm">
        <i class="far fa-map"></i>
      </b-button>
      <b-button v-else-if="field.type === 'url'" variant="outline-primary" size="sm">
        <i class="fas fa-external-link-alt"></i>
      </b-button>
    </b-form>
  </div>
  
</template>

<script>
  import { BButton, BForm, BFormInput, BFormGroup } from 'bootstrap-vue'
  export default {
    computed: {
      typeField() {
        if((typeof this.field.show) === 'boolean') {
          return this.field.show ? 'text' : 'password'
        }
        return 'text'
      },
      data() {
        return this.field.data
      },
      showEye() {
        return this.field.type === 'userName'  || this.field.type === 'password'
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

    button {
      margin-right: 6px;
    }
  }
</style>