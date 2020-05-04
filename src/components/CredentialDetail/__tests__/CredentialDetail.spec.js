/* eslint-disable */
import { mount, shallowMount } from '@vue/test-utils'
import CredentialDetail from '@/components/CredentialDetail/CredentialDetail.vue'
import MasterP from '@/mixins/MasterP'

describe('CredentialDetail', () => {
  let wrapper

  let propsData = {
    data: '',
    open: true
  }

  beforeEach(() => {
    wrapper = shallowMount(CredentialDetail, {
      propsData
    })
  })

  it('Should enable show data when execute onToggleShowPass function', () => {
    wrapper.setData({
      'credentialDetailArray': [
        {
          fieldName: 'userName',
          data: '12345',
          type: 'userName',
          show: false
        },
        {
          fieldName: 'password',
          data: '67890',
          type: 'password',
          show: false
        }
      ]
    })
    wrapper.vm.onToggleShowPass(1)
    expect(wrapper.vm.credentialDetailArray[1].show).toBe(true)
  })

  it('Should show error on decrypt error', () => {
    wrapper = shallowMount(CredentialDetail, {
      propsData,
      mixins: [MasterP]
    })
    wrapper.vm.masterpError = true
    const error = wrapper.find('.credential-detail__error')
    expect(error.text()).toEqual('There was an error decripting this credential')
  })
})