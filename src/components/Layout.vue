<template>
  <b-row class="layout-container" align-v="center" align-h="center">
    <b-col cols="4">
      <b-card no-body>
        <!-- Header -->
        <router-view/>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BCard } from 'bootstrap-vue'
  export default {
    components: {
      BRow,
      BCol,
      BCard
    }
  }
</script>

<style lang="scss">
  .layout-container{
    height: 100vh
  }
</style>