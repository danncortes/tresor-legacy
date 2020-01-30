<template>
  <b-col v-if="currentRoute === 'login'" md="8" lg="6" xl="5">
    <b-card no-body>
      <!-- Header -->
      <slot></slot>
    </b-card>
  </b-col>
  <b-col v-else md="11" lg="10" xl="7">
    <b-card no-body>
      <!-- Header -->
      <slot></slot>
    </b-card>
  </b-col>
</template>

<script>
import { BCol, BCard } from 'bootstrap-vue'
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