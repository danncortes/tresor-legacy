<template>
<div>
  <h3>Dashboard</h3>
</div>
</template>

<script>
import userStore from '@/store/user'

export default {
  created(){
    console.log('this.storeState.user -->', this.storeState.user)
  },
  data(){
    return {
      storeState: userStore.state
    }
  }  
}
</script>