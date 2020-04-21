<template>
  <div class="vault-header d-flex mb-2 justify-content-between">
    <div class="vault-header__logo d-flex">
      <img class="vault-icon mr-1" alt="Vault Logo" src="@/assets/vault-icon.png">
      <h4 class="mb-0 text-secondary font-weight-bold vault-header__logo--text">VAULT</h4>
    </div>
    <b-button v-if="userState.user.isAuth" size="sm" @click="onClickLogout" variant="default" class="text-white">
      <span class="mr-2">Log Out</span>
      <i class="fas fa-sign-out-alt"></i>
    </b-button>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import userStore from '@/store/user'

export default {
  data(){
    return {
      userState: userStore.state
    }
  },
  methods: {
    onClickLogout(){
      userStore.logoutUser()
      this.$router.push('/login')
    }
  },
  components: {
    BButton
  }
}
</script>

<style lang="scss" scoped>
  .vault-header {
    &__logo {
      & .vault-icon {
        width: 30px;
        height: 30px;
      }
      &--text {
        font-size: 20px;
        margin-top: 0.2rem;
      }
    }
  }
</style>