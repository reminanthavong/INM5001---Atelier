const { shallowMount } = require('@vue/test-utils')
const GestionEmploye = require('../../src/components/resources/GestionEmployes.vue')

test('GestionEmploye', () => {
  //GestionEmploye a ete load
  const wrapper = shallowMount(GestionEmploye)

  // should not allow for `username` less than 7 characters, excludes whitespace
  //wrapper.setData({ username: ' '.repeat(7) })

  // assert the error is rendered
  //expect(wrapper.find('.error').exists()).toBe(true)

  // update the name to be long enough
  //wrapper.setData({ username: 'Lachlan' })

  // assert the error has gone away
  //expect(wrapper.find('.error').exists()).toBe(false)
})
