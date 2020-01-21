<template>
  <div class="credential-field">
    <b-container class="bv-example-row">
      <b-row align-h="between" align-v="start" no-gutters>
        <b-col cols="auto">
          <b-form class="credential-field__form" inline>
            <div role="group" v-if="edit">
              <!-- Field Name -->
              <b-input
                size="sm"
                :value="fieldName"
                type="text"
                :readonly="readonly"
                placeholder="Field Name"
                :state="fieldNameValid"
                @keyup="(e) => { onChangeFieldName(e) }"
              ></b-input>
              <b-form-invalid-feedback id="input-live-feedback">
                "{{fieldName}}" field should not be duplicated
              </b-form-invalid-feedback>
            </div>

            <!-- Label Read-->
            <label
            v-else
            class="mr-sm-2"
            :for="`inline-form-input-${field.fieldName}`">
              {{field.fieldName}}
            </label>

            <!-- Data -->
            <b-input
              :id="`inline-form-input-${field.fieldName}`"
              size="sm"
              :value="data"
              :type="typeField"
              :ref="field.fieldName"
              :readonly="readonly"
              :placeholder="`Insert ${fieldName}`"
              @keyup="(e) => { onChangeData(e) }"
            ></b-input>

            <TypesSelect
              :value="field.type"
              @onSelectTypeChange="onSelectTypeChange"
              v-if="edit"/>

            <div class="credential-field__controls-read" v-if="!edit">
              <!-- Eye button Show/Hide-->
              <b-button variant="outline-secondary" size="sm" v-if="showEye" @click="() => { onClickEye(index) }">
                <i class="fas fa-eye" v-if="!field.show"></i>
                <i class="fas fa-eye-slash" v-else></i>
              </b-button>

              <!-- Eye button Copy-->
              <b-button
                variant="outline-primary"
                  size="sm"
                  @click="() => { onCopy(field.fieldName, index) }">
                <i class="far fa-copy"></i>
              </b-button>

              <!-- Eye button Send Email-->
              <b-button v-if="field.type === 'email'" variant="outline-primary" size="sm" @click="() => { sendEmail()}">
                <i class="far fa-envelope"></i>
              </b-button>

              <!-- Eye button Open Map-->
              <b-button v-else-if="field.type === 'address'" variant="outline-primary" size="sm" @click="() => { searchMap()}">
                <i class="far fa-map"></i>
              </b-button>

              <!-- Eye button Open Url-->
              <b-button v-else-if="field.type === 'url'" variant="outline-primary" size="sm" @click="() => { openAddress()}">
                <i class="fas fa-external-link-alt"></i>
              </b-button>

              <span v-if="copied">Copied!</span>
            </div>
          </b-form>
        </b-col>

        <b-col cols="auto" v-if="edit">
          <div class="credential-field__controls-read">
            <b-button pill variant="outline-danger" size="sm" v-if="minusButton" @click="onClickRemove">
              <i class="fas fa-minus"></i>
            </b-button>
            <b-button pill variant="outline-success" size="sm" v-if="plusButton" @click="onClickAdd">
              <i class="fas fa-plus"></i>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { BButton, BForm, BFormInput, BContainer, BRow, BCol, BFormInvalidFeedback } from 'bootstrap-vue'
  import TypesSelect from '@/components/TypesSelect'
  export default {
    data(){
      return {
        copied: false
      }
    },
    computed: {
      readonly() {
        return !this.edit
      },
      typeField() {
        if((typeof this.field.show) === 'boolean') {
          return this.field.show ? 'text' : 'password'
        }
        return 'text'
      },
      fieldName() {
        return this.field.fieldName
      },
      data() {
        return this.field.data
      },
      showEye() {
        return this.field.type === 'userName'  || this.field.type === 'password'
      }
    },
    methods: {
      onClickEye(index) {
        this.$emit('onToggleShowPass', index)
      },
      onCopy(el, index) {
        this.$emit('onToggleShowPass', index)
        this.$nextTick(() => {this.readonly = false})
        this.$nextTick(() => {this.$refs[el].select()})
        this.$nextTick(() => {document.execCommand('copy')})
        this.$nextTick(() => {this.$emit('onToggleShowPass', index)})
        this.$nextTick(() => {this.readonly = true})
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 1000)
      },
      sendEmail() {
        window.location.href = `mailto:${this.data}`
      },
      openAddress() {
        window.open(`http://${this.data}`, "_blank")
      },
      searchMap() {
        window.open(`https://www.google.com/maps/search/${this.data}`, "_blank")
      },
      onChangeFieldName(e) {
        this.$emit('onChangeFieldName', e.target.value)
      },
      onChangeData(e) {
        this.$emit('onChangeData', e.target.value)
      },
      onSelectTypeChange(type) {
        this.$emit('onSelectTypeChange', type)
      },
      onClickRemove() {
        this.$emit('onClickRemove')
      },
      onClickAdd() {
        this.$emit('onClickAdd')
      }
    },
    props: {
      field: {
        required: true,
        type: Object
      },
      index: {
        required: true
      },
      edit: {
        type: Boolean,
        default: false
      },
      plusButton: {
        required: false,
        default: false
      },
      minusButton: {
        required: false,
        default: true
      },
      fieldNameValid: {
        required: false,
        default: true
      }
    },
    components: {
      BButton,
      BForm,
      'b-input': BFormInput,
      TypesSelect,
      BContainer,
      BRow,
      BCol,
      BFormInvalidFeedback
    },
  }
</script>

<style lang="scss">
  .credential-field {
    margin-bottom: 14px;

    .fa-eye, .fa-eye-slash {
      cursor: pointer
    }

    label {
      width: 130px;
      justify-content: initial
    }

    input {
      margin-right: 10px
    }

    button {
      margin-right: 6px;
    }

    &__form {
      align-items: flex-start
    }
  }
</style>