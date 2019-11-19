<template>
  <b-col v-if="currentRoute === 'login'" cols="4">
    <b-card no-body>
      <!-- Header -->
      <slot></slot>
    </b-card>
  </b-col>
  <b-col v-else cols="6">
    <b-card no-body>
      <!-- Header -->
      <slot></slot>
    </b-card>
  </b-col>
</template>

<script>
import { BRow, BCol, BCard } from 'bootstrap-vue'
export default {
  created(){
    this.setCurrentRoute(this.$route)
  },
  data(){
    return {
      currentRoute: ''
    }
  },
  watch: {
    $route(newValue){
      this.setCurrentRoute(newValue)
    }
  },
  methods:{
    setCurrentRoute(routeData){
      this.currentRoute = routeData.name
    }
  },
  components: {
    BCard,
    BCol
  }
}
</script>

<style lang="scss">

</style>