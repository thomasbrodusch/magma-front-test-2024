import { computed, reactive, ref, watch } from "vue";
import { useSignupRouting } from "@/composables/useSignupRouting";
import useApi from "@/composables/useApi";
import useLoading from "@/composables/useLoading";
import useOrganization from "@/composables/useOrganization";
import type { Organization } from "@/types/Organization";
import {
  email,
  magmaLogoFileSizeValidation,
  magmaLogoFileTypeValidation,
  required,
  url
} from "@/utils/i18n-validators";
import { useVuelidate } from "@vuelidate/core";
import type { Ambassador } from "@/types/Ambassador";

const formOrganization = reactive({
  name: "",
  website: "",
  logoFile: undefined
});

const ambassadors = ref<Ambassador[]>([]);

const { isLoading, setLoadingPending, setLoadingSuccess, setLoadingFailed } =
  useLoading();
const { setIsAllowToGoToNextStep } = useSignupRouting();
const { currentOrganization, setCurrentOrganization } = useOrganization();

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

export function useSignupOrganization() {
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

export function useSignupAmbassador() {
  const { $api } = useApi();
  const canAddAmbassador = ref(false);
  setIsAllowToGoToNextStep(true);

  const newAmbassador = reactive({
    firstname: "",
    lastname: "",
    email: ""
  });
  watch(newAmbassador, () => {
    const { firstname, lastname, email } = validation.value;
    canAddAmbassador.value = [firstname, lastname, email].every(
      (v) => !v.$invalid
    );
  });

  const validation = useVuelidate(
    {
      firstname: { required },
      lastname: { required },
      email: { required, email }
    },
    newAmbassador
  );

  async function createAmbassador() {
    setLoadingPending();
    try {
      const ambassador = await $api
        .technicalTest()
        .createAmbassador(currentOrganization.value!.id, newAmbassador);
      if (ambassador) {
        ambassadors.value.push(ambassador);
        setLoadingSuccess();
        return newAmbassador;
      }
    } catch (e) {
      setLoadingFailed();
    }
  }

  async function deleteAmbassador(ambassadorId: number) {
    setLoadingPending();
    try {
      const ambassador = await $api
        .technicalTest()
        .deleteAmbassador(ambassadorId);
      debugger;
      if (ambassador) {
        ambassadors.value = ambassadors.value.filter(
          (a) => a.id !== ambassadorId
        );
      }
      setLoadingSuccess();
      return ambassador;
    } catch (e) {
      setLoadingFailed();
    }
  }

  return {
    isLoading,
    newAmbassador,
    ambassadors,
    validation,
    createAmbassador,
    deleteAmbassador,
    canAddAmbassador
  };
}
