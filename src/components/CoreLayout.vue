<template>
  <b-col :md="layoutBreakPoints.md" :lg="layoutBreakPoints.lg" :xl="layoutBreakPoints.xl">
    <HeaderComponent/>
    <b-card no-body>
      <slot></slot>
    </b-card>
  </b-col>
</template>

<script>
import { BCol, BCard } from 'bootstrap-vue'
import HeaderComponent from '@/components/HeaderComponent'

export default {
  created(){
    this.setCurrentRoute(this.$route)
  },
  data(){
    return {
      currentRoute: '',
      loginLayoutBreakPoints: {
        md: '7',
        lg: '6',
        xl: '4'
      },
      defaultLayoutBreakPoints: {
        md: '11',
        lg: '9',
        xl: '6'
      }
    }
  },
  watch: {
    $route(newValue){
      this.setCurrentRoute(newValue)
    }
  },
  computed: {
    layoutBreakPoints() {
      return this.currentRoute === 'login' ? this.loginLayoutBreakPoints : this.defaultLayoutBreakPoints
    }
  },
  methods:{
    setCurrentRoute(routeData){
      this.currentRoute = routeData.name
    }
  },
  components: {
    BCard,
    BCol,
    HeaderComponent
  }
}
</script>