import ComponentWrapper from "../support/ComponentWrapper";
import { nextTick } from "vue";
import SignupAmbassadorsView from "@/views/signup/SignupAmbassadorsView.vue";
import { useSignupAmbassador } from "@/composables/useSignup";
import { ambassadorInitial } from "@/helpers/AmbassadorHelper";
import { expect, vi } from "vitest";

class SignupAmbassadorViewWrapper extends ComponentWrapper {
  roundedProgress() {
    return this.findByTestId("ambassador-rounded-progress");
  }

  allAmbassadorTable() {
    return this.impl.findAll(".base-datagrid__entry");
  }
}

describe("SignupAmbassadorView", () => {
  let wrapper: SignupAmbassadorViewWrapper;
  const MOCK_AMBASSADOR = {
    id: 1,
    organizationId: 1,
    firstname: "Thomas",
    lastname: "Brodusch",
    email: "thomas.brodusch@magma.com"
  };

  describe("Table Ambassador", () => {
    const ambassadorsHook = useSignupAmbassador();
    const { ambassadors } = ambassadorsHook;
    const deleteAmbassadorSpy = vi.spyOn(ambassadorsHook, "deleteAmbassador");

    beforeAll(async () => {
      ambassadors.value.push(MOCK_AMBASSADOR);
      wrapper = new SignupAmbassadorViewWrapper(SignupAmbassadorsView, {
        shallow: false
      });
      await nextTick();
    });

    it(`should display 1 ambassador on table`, async () => {
      expect(wrapper.allAmbassadorTable().length).toBe(
        ambassadors.value.length
      );
      expect(
        wrapper
          .roundedProgress()
          .find('[magma-test-id="ambassador-rounded-progress-count"]')
          .text()
      ).toStrictEqual("1");
      expect(
        wrapper
          .roundedProgress()
          .find('[magma-test-id="ambassador-rounded-progress-total"]')
          .text()
      ).toStrictEqual("5");
    });

    it(`should display "1" related to count on Ambassador rounded progress`, async () => {
      expect(
        wrapper
          .roundedProgress()
          .find('[magma-test-id="ambassador-rounded-progress-count"]')
          .text()
      ).toStrictEqual("1");
    });

    it(`should display "5" related to total on Ambassador rounded progress`, async () => {
      expect(
        wrapper
          .roundedProgress()
          .find('[magma-test-id="ambassador-rounded-progress-total"]')
          .text()
      ).toStrictEqual("5");
    });

    it(`should ambassador avatar`, async () => {
      const ambassadorDOM = wrapper.allAmbassadorTable()[0];

      expect(
        ambassadorDOM.find('[magma-test-id="table-ambassador-avatar"]').text()
      ).toBe(ambassadorInitial(MOCK_AMBASSADOR));
    });
    it(`should ambassador name`, async () => {
      const ambassadorDOM = wrapper.allAmbassadorTable()[0];

      expect(
        ambassadorDOM
          .find('[magma-test-id="table-ambassador-display-name"]')
          .text()
      ).toBe(`${MOCK_AMBASSADOR.firstname} ${MOCK_AMBASSADOR.lastname}`);
    });

    it(`should ambassador email`, async () => {
      const ambassadorDOM = wrapper.allAmbassadorTable()[0];

      expect(
        ambassadorDOM.find('[magma-test-id="table-ambassador-email"]').text()
      ).toBe(MOCK_AMBASSADOR.email);
    });
  });
});
