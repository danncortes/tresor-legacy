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
      ></b-form-input>
    </b-form-group>
    <b-alert v-model="showAlert" variant="danger" dismissible>
      {{error}}
    </b-alert>
    <b-button type="submit" variant="primary" size="sm">Submit</b-button>
    <b-button type="reset" variant="default" size="sm">Reset</b-button>
  </b-form>
</template>

<script>
import { BButton, BForm, BFormInput, BFormGroup, BAlert } from 'bootstrap-vue'
export default {
  data(){
    return {
      form:{
        email: '',
        password: ''
      },
      showAlert: !!this.error,
    }
  },
  props: {
    error: {
      type: String
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