<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group
      id="input-group-email-signup"
      label="Email"
      label-for="input-email-signup"
    >
      <b-form-input
        id="input-email-signup"
        v-model="form.email"
        type="email"
        required
        placeholder="Enter email"
        :readonly="readonly"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-pass-signup"
      label="Password"
      label-for="input-pass-signup"
    >
      <b-form-input
        id="input-pass-signup"
        v-model="form.password"
        type="password"
        required
        placeholder="Enter your password"
        :readonly="readonly"
        :state="validPass"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-confirm-pass"
      label="Confirm Password"
      label-for="input-confirm-pass"
    >
      <b-form-input
        id="input-confirm-pass"
        v-model="form.confirmPassword"
        type="password"
        required
        placeholder="Confirm your password"
        :readonly="readonly"
        :state="validPass"
      ></b-form-input>
    </b-form-group>
    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{error}}
    </b-alert>
    <b-button block type="submit" variant="primary" :disabled="loading || !passMatch">
      <i class="fas fa-spinner fa-spin" v-if="loading"></i>
      <span v-else>Sign Up</span>
    </b-button>
    <b-button block type="reset" variant="default" size="sm">Clear</b-button>
  </b-form>
</template>

<script>
import { BButton, BForm, BFormInput, BFormGroup, BAlert } from 'bootstrap-vue'
export default {
  mounted(){
    setTimeout(() => {
      this.readonly = false
    }, 0)
  },
  data(){
    return {
      form:{
        email: '',
        password: ''
      },
      showAlert: !!this.error,
      readonly: true,
      validPass: null
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
  computed: {
    passMatch(){
      return this.form.password === this.form.confirmPassword
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
      this.$emit('onSubmitSignUp', this.form)
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