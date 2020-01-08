<template>
  <div class="credential-list-item">
    <div
      class="credential-list-item__bar"
      @click="onClickCredential"
      v-b-toggle="credential._id"
    >
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="5">{{credential.name}}</b-col>
          <b-col cols="3">{{credential.updatedAt | format('DD-MM-YYYY HH:mm')}}</b-col>
          <b-col cols="3">{{credential.createdAt | format('DD-MM-YYYY HH:mm')}}</b-col>
          <b-col cols="1">eye</b-col>
        </b-row>
      </b-container>
    </div>
    
    <b-collapse :id="credential._id">
      Hi
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse, VBToggle, BContainer, BRow, BCol } from 'bootstrap-vue'

export default {
  props: {
    credential: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClickCredential(){
      this.$emit('onClickCredential')
    }
  },
  directives: {
    'b-toggle': VBToggle
  },
  components: {
    BCollapse,
    BContainer,
    BRow,
    BCol
  }
}
</script>

<style lang="scss">
  .credential-list-item {
    &__bar {
      border-top: 1px solid #e5e5e5;
      cursor: pointer;
      padding: 12px 2px;
    }
  }
</style>