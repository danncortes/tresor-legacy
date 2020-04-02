<template>
  <div class="welcome-view p-4">
    <h3>Welcome to Vault</h3>
    <p>This is your Master Password and here there are some important details to know about it:</p>
    <ul>
      <li>It will be used to encrypt all your credentials</li>
      <li>It's unique and not recoverable/resetable</li>
      <li>It will be required every time you login in a new device</li>
    </ul>
    <p class="mb-4">Since <strong>
      this is not your login password (which you can reset)</strong>, you must save this Master Password in a secure place.
    </p>
    <div class="d-flex">
      <div>
        <div class="welcome-view__mastep border rounded p-2 text-info mb-2 text-center">
          <strong>{{this.masterp}}</strong>
        </div>
        <p class="text-info">Copy and Save this Master Password in a secure place!</p>
      </div>
    </div>
    <b-button
      type="reset"
      variant="primary"
      size="sm"
      @click="goToDashboard">
      Continue <i class="fas fa-arrow-circle-right ml-1"></i>
    </b-button>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
export default {
  created(){
    if(!this.masterp) {
      this.goToDashboard()
    }
  },
  data() {
    return {
      masterp: this.$route.params.masterp
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard')
    }
  },
  components: {
    BButton
  }
}
</script>