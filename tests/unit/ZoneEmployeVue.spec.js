import { mount } from "@vue/test-utils";
import ZoneEmploye from "../../src/components/resources/ZoneEmploye.vue";
import sinon from "sinon";

describe("ZoneEmploye", () => {
  it("Appelle toggleAfficherDispos quand le bouton est clique", () => {
    sinon.stub(ZoneEmploye.mounted);
    const spyToggleAfficherDispos = sinon.spy(
      ZoneEmploye.methods,
      "toggleAfficherDispos"
    );
    const wrapper = mount(ZoneEmploye);
    const button = wrapper.find("#test-bouton-1");

    button.trigger("click");

    sinon.assert.calledOnce(spyToggleAfficherDispos);
  });
});
