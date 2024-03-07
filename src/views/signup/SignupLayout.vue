<script setup lang="ts">
// Components
import SignupSidebar from "@/components/shell/SignupSidebar.vue";
import SignupFooter from "@/components/shell/SignupFooter.vue";
import { SignupStep, useSignupRouting } from "@/composables/useSignupRouting";
import { useSignupOrganization } from "@/composables/useSignup";

const {
  currentStep,
  prevStep,
  goToNextStep,
  goToPrevStep,
  isAllowToGoToNextStep
} = useSignupRouting();
const { createOrganization } = useSignupOrganization();

async function handleGoToNextStepBtnClick() {
  if (currentStep.value.page === SignupStep.Organization) {
    await createOrganization();
  }
  goToNextStep();
}
</script>

<template>
  <div class="signuplayout flex">
    <SignupSidebar />
    <div class="signuplayout__main flex flex-col h-screen w-full">
      <router-view />
      <SignupFooter
        :show-go-prev="!!prevStep"
        :is-allowed-to-go-next="isAllowToGoToNextStep"
        @on-go-next-btn-click="handleGoToNextStepBtnClick"
        @on-go-prev-btn-click="goToPrevStep"
      />
    </div>
  </div>
</template>
