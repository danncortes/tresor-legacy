<template>
  <div>
    <b-tabs card justified>
      <b-tab title="Login" active>
        <LoginForm
          @onSubmitLogin="onSubmitLogin"
          :error="userState.errorLogin"
          :loading="userState.loadingLogin"
        ></LoginForm>
      </b-tab>
      <b-tab title="Sign Up">
        <SignUpForm
          @onSubmitSignUp="onSubmitSignUp"
          :error="userState.errorSignup"
          :loading="userState.loadingSignup"
        ></SignUpForm>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import LoginForm from '@/components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import userStore from '@/store/user'

export default {
  data(){
    return {
      userState: userStore.state
    }
  },
  methods: {
    onSubmitLogin(form) {
      userStore.loginUser(form)
    },
    onSubmitSignUp(form) {
      const { email, password } = form
      userStore.signupUser(email, password)
    }
  },
  components: {
    BTabs,
    BTab,
    LoginForm,
    SignUpForm
  }
}
</script>