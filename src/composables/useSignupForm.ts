import { computed, reactive, watch } from "vue";
import { useSignupRouting } from "@/composables/useSignupRouting";
import useApi from "@/composables/useApi";
import useLoading from "@/composables/useLoading";
import useOrganization from "@/composables/useOrganization";
import type { Organization } from "@/types/Organization";
import {
  magmaLogoFileSizeValidation,
  magmaLogoFileTypeValidation,
  required,
  url
} from "@/utils/i18n-validators";
import { useVuelidate } from "@vuelidate/core";

const formOrganization = reactive({
  name: "",
  website: "",
  logoFile: undefined
});

const { isLoading, setLoadingPending, setLoadingSuccess, setLoadingFailed } =
  useLoading();
const { setIsAllowToGoToNextStep } = useSignupRouting();
const { setCurrentOrganization } = useOrganization();
const validation = useVuelidate(
  {
    name: { required, $lazy: true },
    website: { required, url },
    logoFile: {
      magmaLogoFileTypeValidation,
      magmaLogoFileSizeValidation
    }
  },
  formOrganization
);

export default function useSignupForm() {
  const { $api } = useApi();

  const logoPreviewURL = computed(() => {
    if (!formOrganization.logoFile) {
      return "/img/icons/image.png";
    }
    const urlCreator = window?.URL || window?.webkitURL;
    return urlCreator.createObjectURL(formOrganization.logoFile);
  });

  watch(formOrganization, () => {
    const { name, website, logoFile } = validation.value;
    const isAllowed = [name, website, logoFile].every((v) => !v.$invalid);
    setIsAllowToGoToNextStep(isAllowed);
  });

  async function createOrganization(): Promise<Organization | undefined> {
    setLoadingPending();
    try {
      const organization = await $api.technicalTest().createOrganization(
        {
          organizationName: formOrganization.name,
          website: formOrganization.website
        },
        formOrganization.logoFile
      );
      if (organization) {
        setCurrentOrganization(organization);
        setLoadingSuccess();
      }
      return organization;
    } catch (e) {
      setLoadingFailed();
    }
  }

  return {
    isLoading,
    formOrganization,
    logoPreviewURL,
    validation,
    createOrganization
  };
}
