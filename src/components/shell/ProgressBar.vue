<script setup lang="ts">
// NPM
import { computed } from "vue";
import { useRoute } from "vue-router";

// Stores & Composables
import { useSignupRouting } from "@/composables/useSignupRouting";
const { signupSteps } = useSignupRouting();

// Plugins
const route = useRoute();

// Props
defineProps({
  isSubmitting: {
    type: Boolean,
    default: false
  }
});

const progress = computed(() => {
  const routeName = route?.name as string;
  const steps = signupSteps.value;
  const currentStep = steps.findIndex((step) => step.page === routeName);

  return 0.2 + currentStep * (99.8 / (steps.length - 1));
});
</script>

<template>
  <progress
    class="progress-bar h-0.5 w-full bg-background-brand-default"
    :value="progress"
    max="100"
  ></progress>
</template>

<style scoped>
/* Firefox */
.progress-bar::-webkit-progress-bar {
  /* Reset default background color; */
  background-color: transparent;
}
.progress-bar::-webkit-progress-value {
  background-color: #444ce7;
}
</style>
