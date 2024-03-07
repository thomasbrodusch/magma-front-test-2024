<script setup lang="ts">
// Components
import { BaseIcon } from "magma-design-system-test";

// Composables
import {
  SignupStep,
  SignupStepState,
  useSignupRouting
} from "@/composables/useSignupRouting";
import { useRoute } from "vue-router";
import { computed } from "vue";
const { signupSteps } = useSignupRouting();
const route = useRoute();

const isOnSuccessScreen = computed(() => route.name === SignupStep.Success);
</script>

<template>
  <nav
    class="relative hidden min-h-screen max-w-[496px] bg-background-subtle py-10 px-20 md:block"
  >
    <img
      class="mb-20"
      src="/img/logo_magma_full.png"
      alt="logo magma"
      height="32"
      width="140"
    />

    <h1 class="mb-2 text-mgm-txt-xl font-medium text-foreground-emphasis">
      {{
        $t(
          `${
            signupSteps.find((step) => step.status === "current")?.name
          }.heading`
        )
      }}
    </h1>

    <p class="mb-6 text-mgm-txt-sm font-normal text-foreground-default">
      {{
        $t(
          `${
            signupSteps.find((step) => step.status === "current")?.name
          }.description`
        )
      }}
    </p>

    <ol class="hide-nav pb-40">
      <li
        v-for="(signupStep, signupStepIndex) in signupSteps"
        :key="signupStepIndex"
      >
        <component
          :is="
            signupStep.status === SignupStepState.Complete || isOnSuccessScreen
              ? 'router-link'
              : 'div'
          "
          :to="{ name: signupStep.page }"
          :class="[
            'mb-4 flex items-center text-mgm-txt-sm ',
            {
              'font-normal text-foreground-success-default':
                signupStep.status === SignupStepState.Complete ||
                isOnSuccessScreen,
              'font-medium text-foreground-brand-default':
                signupStep.status === SignupStepState.Current &&
                !isOnSuccessScreen,
              'font-normal text-foreground-default':
                signupStep.status === SignupStepState.Upcoming
            }
          ]"
          exact-active-class="!text-foreground-brand-default !font-medium"
        >
          <div
            :class="[
              'mr-2 flex h-6 w-6 items-center justify-center rounded-full border text-mgm-txt-xs font-semibold',
              {
                'border-border-default':
                  signupStep.status === SignupStepState.Upcoming,
                'border-border-brand-emphasis':
                  signupStep.status === SignupStepState.Current &&
                  !isOnSuccessScreen,
                'border-border-success-emphasis bg-foreground-success-default':
                  signupStep.status === SignupStepState.Complete ||
                  isOnSuccessScreen
              }
            ]"
          >
            <span
              v-if="
                signupStep.status === SignupStepState.Current &&
                !isOnSuccessScreen
              "
            >
              {{ signupStepIndex + 1 }}
            </span>

            <BaseIcon
              v-else-if="
                signupStep.status === SignupStepState.Complete ||
                isOnSuccessScreen
              "
              icon="check"
              color="#FFFFFF"
            />
          </div>

          {{ $t(`${signupStep.name}.title`) }}
        </component>
      </li>
    </ol>

    <aside
      class="aside-gradient absolute bottom-10 left-20 right-20 rounded-lg border-border-on-emphasis px-6 pb-6 pt-10 shadow-[0px_0px_0px_1px_rgba(6,16,204,0.76),0px_1px_2px_0px_rgba(14,16,56,0.40)]"
    >
      <img
        src="/img/team/joris.png"
        width="56"
        height="56"
        class="absolute top-[-28px] left-6 rounded-full"
        alt="partnership profile picture"
      />

      <div class="relative h-full w-full">
        <span
          class="mb-2 block text-mgm-txt-md font-medium text-foreground-on-emphasis"
        >
          {{ $t("theSignupSidebar.aside.title") }}
        </span>

        <span class="mb-4 block text-mgm-txt-sm font-normal text-border-subtle">
          {{ $t("theSignupSidebar.aside.description") }}
        </span>

        <span class="flex items-center">
          <BaseIcon icon="calendar" color="#FFFFFF" class="mr-2" />
          <a
            href="https://magma.app"
            target="_blank"
            class="text-mgm-txt-sm font-medium text-foreground-on-emphasis underline"
          >
            {{ $t("theSignupSidebar.aside.cta") }}
          </a>
        </span>
      </div>
    </aside>
  </nav>
</template>

<style scoped>
@media (max-height: 809px) {
  .hide-nav {
    display: none;
  }
}
.aside-gradient {
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #444ce7;
}
</style>
