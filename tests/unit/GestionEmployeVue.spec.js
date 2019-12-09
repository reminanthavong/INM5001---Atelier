const { shallowMount } = require('@vue/test-utils')
//const { mount } = require('@vue/test-utils')
const GestionEmploye = require('../../src/components/resources/GestionEmployes.vue')
const sinon = require('sinon')

const Essai = require('../../src/components/resources/essai.vue')

   describe('GestionEmployesVue', function (done) {
   it('devrait fonctionner', async () => {
  //GestionEmploye a ete load
  //const wrapper = mount(GestionEmploye) //shallowMount(GestionEmploye)
  
  // Le bouton genere l'affichage
  //expect(wrapper.find('#testbouton1').exists()).toBeTruthy

   const wrapper = shallowMount(Essai) 
    console.log(wrapper.find('button').at(0))
  //wrapper.find('#testbouton1').trigger("click")
  //expect(wrapper.find('bouton-affichage').text()).toEqual("Veuillez cliquer sur un employé pour le modifier")
  //wrapper.find('#testbouton1').trigger('click')
  //expect(wrapper.find('bouton-affichage').exists()).toBeFalsy()

  // assert the error is rendered
  //expect(wrapper.find('.error').exists()).toBe(true)

  // update the name to be long enough
  //wrapper.setData({ username: 'Lachlan' })

  // assert the error has gone away
  //expect(wrapper.find('.error').exists()).toBe(false)
     });
})
