<template>
  <b-container id="app" fluid @mousemove="onUserInteraction">
    <router-view/>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BContainer } from 'bootstrap-vue'
import { removeTokenAndReject } from '@/helpers/session'

export default {
  name: 'app',
  created(){
    this.autoLogoutCounter()
  },
  updated(){
    this.autoLogoutCounter()
  },
  data(){
    return {
      currentRoute: '',
      interval: null,
      seconds: 0
    }
  },
  methods: {
    autoLogoutCounter() {
      this.currentRoute = this.$router.history.current.path
      if (!this.interval && this.currentRoute !== '/login') {
        this.interval = setInterval(() => {
          this.seconds += 1
        }, 1000)
      }
    },
    onUserInteraction() {
      this.seconds = 0
    }
  },
  watch: {
    seconds(newSeconds) {
      // 120 === 2 minutes
      if (newSeconds === 120 && this.currentRoute !== '/') {
        window.clearInterval(this.interval)
        this.interval = null
        this.seconds = 0
        removeTokenAndReject()
      }
    }
  },
  components: {
    BContainer
  }
}
</script>

<style lang="scss">
  html {
    font-size: 16px;
  }
  
  body {
    background-color: #333333;
    height: 100vh;
  }

  #app {
    height: 100vh;
  }
</style>
