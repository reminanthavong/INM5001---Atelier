import { mount } from "@vue/test-utils";
import GestionHoraire from "../../src/components/resources/GestionHoraire.vue";
import sinon from "sinon";

describe("GestionHoraire", () => {
  it("Appelle afficherHoraireSelonDate quand le bouton est clique", () => {
    const spyGenererHoraire = sinon.spy(
      GestionHoraire.methods,
      "genererHoraire"
    );
    const wrapper = mount(GestionHoraire);
    const button = wrapper.find("#test-bouton-submit");

    button.trigger("submit");

    sinon.assert.calledOnce(spyGenererHoraire);
  });
});
