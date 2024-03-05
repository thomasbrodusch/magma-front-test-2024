import SignupOrganizationView from "@/views/signup/SignupOrganizationView.vue";
import ComponentWrapper from "../support/ComponentWrapper";
import { describe, expect } from "vitest";
import useSignupForm from "@/composables/useSignupForm";

class SignupOrganizationViewWrapper extends ComponentWrapper {
  fieldInputName() {
    return this.findByTestId("input-name", true);
  }

  fieldInputWebsite() {
    return this.findByTestId("input-website", true);
  }

  fieldLogoUpload() {
    return this.findByTestId("input-logo", true);
  }

  svgIllustration() {
    return this.findByTestId("svg-illustration");
  }
}

describe("SignupOrganizationView", () => {
  let wrapper: SignupOrganizationViewWrapper;
  const { formOrganization, validation } = useSignupForm();
  const expectedNameValue = "Magma";
  const expectedWebsiteValue = "https://magma.com";

  beforeEach(() => {
    wrapper = new SignupOrganizationViewWrapper(SignupOrganizationView, {
      shallow: false,
      stubs: {
        FieldInput: true,
        FieldAvatarUploader: true
      }
    });
  });

  describe("Form Field", () => {
    describe("Field Name", () => {
      it("should be required", () => {
        expect(wrapper.fieldInputName().attributes("required")).toStrictEqual(
          "true"
        );
      });

      it('should display placeholder "Acme inc."', () => {
        expect(
          wrapper.fieldInputName().attributes("placeholder")
        ).toStrictEqual("Acme inc.");
      });

      it("should update formOrganization.name and call validation on input blur", async () => {
        const validationNameTouchSpy = vi.spyOn(
          validation.value.name,
          "$touch"
        );
        wrapper.fieldInputName().vm.$emit("blur", expectedNameValue);
        expect(formOrganization.name).toStrictEqual(expectedNameValue);
        expect(validationNameTouchSpy).toHaveBeenCalled();
      });
    });

    describe("Field Website", () => {
      it("should be required", () => {
        expect(
          wrapper.fieldInputWebsite().attributes("required")
        ).toStrictEqual("true");
      });
      it('should display placeholder "https://acme.com"', () => {
        expect(
          wrapper.fieldInputWebsite().attributes("placeholder")
        ).toStrictEqual("https://acme.com");
      });
      it("should update formOrganization.websitea and call validation on value change", async () => {
        const validationWebsiteTouchSpy = vi.spyOn(
          validation.value.website,
          "$touch"
        );
        wrapper.fieldInputWebsite().setValue(expectedWebsiteValue);
        wrapper.fieldInputWebsite().vm.$emit("blur");
        expect(formOrganization.website).toStrictEqual(expectedWebsiteValue);
        expect(validationWebsiteTouchSpy).toHaveBeenCalled();
      });
    });

    describe("Avatar Uploader", () => {
      it("should not be required", () => {
        expect(wrapper.fieldLogoUpload().attributes("required")).toStrictEqual(
          "false"
        );
      });
    });

    describe("Svg Illustration", () => {
      it(`should have company name set to '${expectedNameValue}'`, () => {
        expect(
          wrapper
            .svgIllustration()
            .find(".magma-signup-illustration-organization-name")
            .text()
        ).toStrictEqual(expectedNameValue);
      });
    });
  });
});
