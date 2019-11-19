<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group
      id="input-group-email"
      label="Email"
      label-for="input-email"
    >
      <b-form-input
        id="input-email"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter email"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-pass"
      label="Password"
      label-for="input-pass"
    >
      <b-form-input
        id="input-pass"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-masterp-login"
      label="Master Password"
      label-for="input-masterp-login"
      v-if="!this.masterp"
    >
      <b-form-input
        id="input-masterp-login"
        v-model="form.masterp"
        type="password"
        :required="!this.masterp"
        placeholder="Enter your Master Password"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{error}}
    </b-alert>
    <b-button block type="submit" variant="primary" :disabled="loading">
      <i class="fas fa-spinner fa-spin" v-if="loading"></i>
      <span v-else>Log In</span>
    </b-button>
    <b-button block type="reset" variant="default" size="sm">Reset</b-button>
  </b-form>
</template>

<script>
import store2 from 'store2'
import { BButton, BForm, BFormInput, BFormGroup, BAlert } from 'bootstrap-vue'
export default {
  created(){
    this.masterp = store2('masterp')
  },
  mounted(){
    setTimeout(() => {
      this.readonly = false
    }, 0)
  },
  data(){
    return {
      form:{
        email: '',
        password: '',
        masterp: ''
      },
      showAlert: !!this.error,
      readonly: true,
      masterp: null
    }
  },
  props: {
    error: {
      type: [String, Boolean]
    },
    loading: {
      type: Boolean
    }
  },
  watch:{
    error(newValue) {
      if(newValue) {
        this.showAlert = true
      }
    }
  },
  methods:{
    onSubmit(){
      this.form.masterp = this.masterp ? this.masterp : this.form.masterp
      this.$emit('onSubmitLogin', this.form)
    }
  },
  components: {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BAlert
  },
}
</script>