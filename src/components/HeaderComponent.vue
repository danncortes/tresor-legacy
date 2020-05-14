<template>
  <div class="tresor-header d-flex mb-2 justify-content-between">
    <div class="tresor-header__logo d-flex">
      <img class="tresor-icon mr-1" alt="Tresor Logo" src="@/assets/tresor-icon.png">
      <h4 class="mb-0 text-secondary font-weight-bold tresor-header__logo--text">TRESOR</h4>
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
  .tresor-header {
    &__logo {
      & .tresor-icon {
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