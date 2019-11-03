<template>
  <div>
    <b-tabs card justified>
      <b-tab title="Login" active>
        <LoginForm
          @onSubmitLogin="onSubmitLogin"
          :error="errorLogin"
        ></LoginForm>
      </b-tab>
      <b-tab title="Sign Up">
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import LoginForm from '@/components/LoginForm.vue'
import userStore from '@/store/user'

export default {
  data(){
    return {
      show: true,
      errorLogin: '',
      storeState: userStore.state
    }
  },
  methods: {
    onSubmitLogin(form){
      userStore.loginUser(form)
    }
  },
  components: {
    BTabs,
    BTab,
    LoginForm
  }
}
</script>