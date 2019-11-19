<template>
  <b-row class="layout-container" align-v="center" align-h="center">
    <CoreLayout>
      <router-view/>
    </CoreLayout>
  </b-row>
</template>

<script>
import { BRow } from 'bootstrap-vue'
import CoreLayout from '@/components/CoreLayout.vue'
  export default {
    components: {
      BRow,
      CoreLayout
    }
  }
</script>

<style lang="scss">
  .layout-container{
    height: 100vh
  }
</style>