<template>
  <div>
    <b-tabs card justified>
      <b-tab title="Login" active>
        <LoginForm
          @onSubmitLogin="onSubmitLogin"
          :error="userState.login.error"
          :loading="userState.login.loading"
        ></LoginForm>
      </b-tab>
      <b-tab title="Sign Up">
        <SignUpForm
          @onSubmitSignUp="onSubmitSignUp"
          :error="userState.signUp.error"
          :loading="userState.signUp.loading"
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