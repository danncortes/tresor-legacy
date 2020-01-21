<template>
  <b-form-select
    v-model="selected"
    size="sm"
    :options="options"
    @change="onSelectTypeChange"
  ></b-form-select>
</template>

<script>
  import { BFormSelect } from 'bootstrap-vue'
  import { types } from '@/constants'

  export default {
    created() {
      this.options = types.map(type => ({
        value: type. value,
        text: type.label
      }))
    },
    data() {
      return {
        selected: this.value,
        options: []
      }
    },
    methods: {
      onSelectTypeChange() {
        this.$emit('onSelectTypeChange', this.selected)
      }
    },
    props: {
      value: {
        required: true,
        type: String
      }
    },
    components: {
      BFormSelect
    }
  }
</script>