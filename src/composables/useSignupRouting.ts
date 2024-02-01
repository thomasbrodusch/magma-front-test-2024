// NPM
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useSignupRouting() {
  // Plugins
  const route = useRoute();

  const signupSteps = computed(() => {
    const steps = [
      {
        name: "theSignupSidebar.navigation.itemTwo",
        page: "signup-organization"
      },
      {
        name: "theSignupSidebar.navigation.itemFive",
        page: "signup-ambassadors"
      },
    ];

    const currentIndex = steps.findIndex((step) => step.page === route?.name);

    return steps.map((step, index) => ({
      ...step,
      status:
        index < currentIndex
          ? "complete"
          : index === currentIndex
            ? "current"
            : "upcoming"
    }));
  });

  return { signupSteps };
}
