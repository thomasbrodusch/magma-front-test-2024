// NPM
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export enum SignupStep {
  Organization = "signup-organization",
  Ambassadors = "signup-ambassadors"
}

export enum SignupStepState {
  Current = "current",
  Upcoming = "upcoming",
  Complete = "complete"
}

const isAllowToGoToNextStep = ref(false);

export function useSignupRouting() {
  // Plugins
  const route = useRoute();
  const router = useRouter();

  const steps = [
    {
      name: "theSignupSidebar.navigation.itemTwo",
      page: SignupStep.Organization
    },
    {
      name: "theSignupSidebar.navigation.itemFive",
      page: SignupStep.Ambassadors
    }
  ];
  const currentStepIndex = computed(() =>
    steps.findIndex((step) => step.page === route?.name)
  );

  const signupSteps = computed(() => {
    return steps.map((step, index) => ({
      ...step,
      status:
        index < currentStepIndex.value
          ? SignupStepState.Complete
          : index === currentStepIndex.value
            ? SignupStepState.Current
            : SignupStepState.Upcoming
    }));
  });

  const currentStep = computed(() => signupSteps.value[currentStepIndex.value]);
  const nextStep = computed(
    () => signupSteps.value[currentStepIndex.value + 1]
  );

  function goToNextStep() {
    if (isAllowToGoToNextStep.value) {
      router.push({ name: nextStep.value.page });
    }
  }

  function setIsAllowToGoToNextStep(isAllowed: boolean) {
    isAllowToGoToNextStep.value = isAllowed;
  }

  return {
    currentStep,
    signupSteps,
    isAllowToGoToNextStep,
    setIsAllowToGoToNextStep,
    goToNextStep
  };
}
