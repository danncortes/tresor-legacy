/* eslint-disable */
import { mount, shallowMount } from '@vue/test-utils'
import CredentialField from '@/components/CredentialField/CredentialField.vue'
import { BButton } from 'bootstrap-vue'

describe('CredentialField - Read', () => {
  let wrapper

  let propsData = {
    field: {
      fieldName: 'userName',
      data: '12345',
      type: 'userName',
      show: false
    },
    index: 1,
    edit: false,
    plusButton: true,
    minusButton: true,
    fieldNameValid: null
  }

  beforeEach(() => {
    wrapper = mount(CredentialField, {
      propsData
    })
  })

  it('Should render fieldName in a label', () => {
    const fieldNameLabel = wrapper.find('label.credential-field__field-name-read')
    expect(fieldNameLabel.text()).toBe(propsData.field.fieldName)
  })

  it('Should render data in a Input readOnly and type password', () => {
    const dataInput = wrapper.find('input.credential-field__data-field')
    expect(dataInput.attributes('type')).toBe('password')
    expect(dataInput.attributes('readonly')).toBe('readonly')
  })

  it('Should render an eye button to reveal the data', () => {
    const revealDataBtn = wrapper.find('button.credential-field__reveal-data-btn')
    expect(revealDataBtn.exists()).toBe(true)
    expect(revealDataBtn.contains('i.fas.fa-eye')).toBe(true)
  })

  it('Should render a Copy Btn', () => {
    const copyDataBtn = wrapper.find('button.credential-field__copy-btn')
    expect(copyDataBtn.exists()).toBe(true)
    expect(copyDataBtn.contains('i.far.fa-copy')).toBe(true)
  })

  it('Should render email btn', () => {
    const newProps = { ...propsData, field: { ...propsData.field, type: 'email' } }
    wrapper = mount(CredentialField, { propsData: newProps })
    const emailBtn = wrapper.find('button.credential-field__email-btn')
    expect(emailBtn.exists()).toBe(true)
    expect(emailBtn.contains('i.far.fa-envelope')).toBe(true)
  })

  it('Should render address btn', () => {
    const newProps = { ...propsData, field: { ...propsData.field, type: 'address' } }
    wrapper = mount(CredentialField, { propsData: newProps })
    const addressBtn = wrapper.find('button.credential-field__address-btn')
    expect(addressBtn.exists()).toBe(true)
    expect(addressBtn.contains('i.far.fa-map')).toBe(true)
  })

  it('Should render url btn', () => {
    const newProps = { ...propsData, field: { ...propsData.field, type: 'url' } }
    wrapper = mount(CredentialField, { propsData: newProps })
    const urlBtn = wrapper.find('button.credential-field__url-btn')
    expect(urlBtn.exists()).toBe(true)
    expect(urlBtn.contains('i.fas.fa-external-link-alt')).toBe(true)
  })

  it('Should Not render Remove field btn', () => {
    const removeBtn = wrapper.find('button.credential-field__remove-btn')
    expect(removeBtn.exists()).toBe(false)
  })

  it('Should Not render Add field btn', () => {
    const addBtn = wrapper.find('button.credential-field__add-btn')
    expect(addBtn.exists()).toBe(false)
  })

  it('Should emmit proper event when click Eye Icon', async () => {
    const eyeBtn = wrapper.find(BButton)
    eyeBtn.trigger('click')
    await wrapper.vm.$nextTick()
    expect('onToggleShowPass' in wrapper.emitted()).toBe(true)
  })
})

describe('CredentialField - Edit', () => {
  let wrapper

  let propsData = {
    field: {
      fieldName: 'userName',
      data: 'johndoe',
      type: 'userName'
    },
    index: 1,
    edit: true,
    plusButton: true,
    minusButton: true,
    fieldNameValid: null
  }

  beforeEach(() => {
    wrapper = mount(CredentialField, {
      propsData
    })
  })

  it('Should render fieldName in an Input', () => {
    const fieldNameInput = wrapper.find('input.credential-field__input-field-name')
    expect(fieldNameInput.element.value).toBe(propsData.field.fieldName)
  })

  it('Should render data field in an Input', () => {
    const dataInput = wrapper.find('input.credential-field__data-field')
    expect(dataInput.attributes('type')).toBe('text')
    expect(dataInput.attributes('readonly')).toBe(undefined)
  })

  it('Should render a Select of Types', () => {
    const typeSelect = wrapper.find('select.credential-field__type-select')
    expect(typeSelect.exists()).toBe(true)
  })

  it('Should render Add and Remove field btn', () => {
    expect(wrapper.find('button.credential-field__add-btn').exists()).toBe(true)
    expect(wrapper.find('button.credential-field__remove-btn').exists()).toBe(true)
  })

  it('Should not render Remove field btn nor Add field btn', () => {
    const newProps = { ...propsData, plusButton: false, minusButton: false }
    wrapper = mount(CredentialField, {
      propsData: newProps
    })
    expect(wrapper.find('button.credential-field__remove-btn').exists()).toBe(false)
    expect(wrapper.find('button.credential-field__add-btn').exists()).toBe(false)
  })
})