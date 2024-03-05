import { flushPromises } from "@vue/test-utils";

import ComponentWrapper from "../support/ComponentWrapper";
import { asMock } from "../support/globalMocks";

import { useRoute } from "vue-router";

import SignupLayout from "@/views/signup/SignupLayout.vue";
import SignupFooter from "@/components/shell/SignupFooter.vue";

import useApi from "@/composables/useApi";
import useOrganization from "@/composables/useOrganization";
import { SignupStep } from "@/composables/useSignupRouting";
import useSignupForm from "@/composables/useSignupForm";

class SignupLayoutWrapper extends ComponentWrapper {
  signupFooter() {
    return this.impl.findComponent(SignupFooter);
  }
}
describe("SignupLayout", () => {
  let wrapper: SignupLayoutWrapper;
  const MOCK_CREATED_ORGANIZATION = {
    id: 1,
    name: "Magma",
    website: "eefeef",
    logoUrl: null
  };

  describe(`Signup step: ${SignupStep.Organization}`, () => {
    beforeEach(() => {
      asMock(useRoute).mockImplementation(() => ({
        name: SignupStep.Organization
      }));
    });

    it("should set SignupFooter", () => {
      wrapper = new SignupLayoutWrapper(SignupLayout);
      expect(
        wrapper.signupFooter().attributes("isallowedtogonext")
      ).toStrictEqual("false");
    });

    it("should call $api.technicalTest().createOrganization on @on-go-next-btn-click", async () => {
      const { currentOrganization } = useOrganization();
      const { $api } = useApi();
      const { formOrganization } = useSignupForm();
      formOrganization.website = MOCK_CREATED_ORGANIZATION.website;
      formOrganization.name = MOCK_CREATED_ORGANIZATION.name;

      const technicalTestSpy = vi.spyOn($api, "technicalTest");

      const createOrganizationSpy = vi
        .fn()
        .mockImplementation(() => MOCK_CREATED_ORGANIZATION);
      technicalTestSpy.mockImplementation(() => ({
        createOrganization: createOrganizationSpy
      }));

      wrapper = new SignupLayoutWrapper(SignupLayout);
      wrapper.signupFooter().vm.$emit("on-go-next-btn-click");
      await flushPromises();

      expect(createOrganizationSpy).toHaveBeenCalledWith(
        {
          organizationName: MOCK_CREATED_ORGANIZATION.name,
          website: MOCK_CREATED_ORGANIZATION.website
        },
        undefined
      );
      expect(currentOrganization.value).toEqual(MOCK_CREATED_ORGANIZATION);
    });
  });
});
