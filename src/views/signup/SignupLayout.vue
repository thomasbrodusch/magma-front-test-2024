<script setup lang="ts">
// Components
import SignupSidebar from "@/components/shell/SignupSidebar.vue";
import SignupFooter from "@/components/shell/SignupFooter.vue";
import { SignupStep, useSignupRouting } from "@/composables/useSignupRouting";
import useSignupForm from "@/composables/useSignupForm";

const { currentStep, goToNextStep, isAllowToGoToNextStep } = useSignupRouting();
const { createOrganization } = useSignupForm();

async function handleGoToNextStepBtnClick() {
  let callResult = undefined;
  if (currentStep.value.page === SignupStep.Organization) {
    callResult = await createOrganization();
  }
  if (callResult) {
    goToNextStep();
  }
}
</script>

<template>
  <div class="signuplayout flex">
    <SignupSidebar />
    <div class="signuplayout__main flex flex-col h-screen w-full">
      <router-view />
      <SignupFooter
        :is-allowed-to-go-next="isAllowToGoToNextStep"
        @on-go-next-btn-click="handleGoToNextStepBtnClick"
      />
    </div>
  </div>
</template>
