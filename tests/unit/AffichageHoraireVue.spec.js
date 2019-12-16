import { mount } from "@vue/test-utils";
import AffichageHoraire from "../../src/components/resources/AffichageHoraire.vue";
import sinon from "sinon";

describe("AffichageHoraire", () => {
  it("Appelle afficherHoraireSelonDate quand le bouton est clique", () => {
    sinon.stub(AffichageHoraire.mounted);
    const spyAffichageEmployes = sinon.spy(
      AffichageHoraire.methods,
      "afficherHoraireSelonDate"
    );
    const wrapper = mount(AffichageHoraire);
    const button = wrapper.find("#test-bouton-1");
    button.trigger("click");

    sinon.assert.calledOnce(spyAffichageEmployes);
  });
});
