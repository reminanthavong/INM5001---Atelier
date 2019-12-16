import { shallowMount, mount } from "@vue/test-utils";
import GestionEmploye from "../../src/components/resources/GestionEmployes.vue";
import sinon from "sinon";

describe("GestionEmploye", () => {
  it("Affiche correctement le composant", () => {
    const wrapper = shallowMount(GestionEmploye);
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("Affiche correctement le bouton Afficher employes", () => {
    const wrapper = mount(GestionEmploye);
    expect(wrapper.contains("button")).toBe(true);
  });

  it("Appelle toggleAfficherEmployes quand le bouton est clique", () => {
    const spyToggleAfficherEmployes = sinon.spy(
      GestionEmploye.methods,
      "toggleAfficherEmployes"
    );
    const wrapper = mount(GestionEmploye);
    const button = wrapper.find("#testbouton1");
    button.trigger("click");

    sinon.assert.calledOnce(spyToggleAfficherEmployes);
  });

  it("Appelle AjouteEmploye quand le bouton est clique", () => {
    const spyAjouteEmploye = sinon.spy(
      GestionEmploye.methods,
      "ajouterEmploye"
    );
    const wrapper = mount(GestionEmploye);
    const button = wrapper.find("#testbouton2");

    button.trigger("submit");

    sinon.assert.calledOnce(spyAjouteEmploye);
  });
});
