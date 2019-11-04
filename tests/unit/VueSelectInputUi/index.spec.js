import { shallowMount } from '@vue/test-utils'

import VueSelectInputUi from '@/VueSelectInputUi'

describe('VueSelectInputUi', () => {
  let wrapper

  beforeEach(() => (
    wrapper = shallowMount(VueSelectInputUi, {
      propsData: {}
    })
  ))

  afterEach(() => {
    wrapper.destroy()
  })
})
