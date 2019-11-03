<template>
  <b-container id="app" fluid>
    <router-view/>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BContainer } from 'bootstrap-vue'

export default {
  name: 'app',
  components: {
    BContainer
  }
}
</script>

<style lang="scss">
  body {
    background-color: #333333;
    height: 100vh;
  }

  #app {
    height: 100vh;
  }
</style>
