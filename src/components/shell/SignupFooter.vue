<script setup lang="ts">
import { BaseButton, BaseIcon } from "magma-design-system-test";
import ProgressBar from "@/components/shell/ProgressBar.vue";
import useSignupForm from "@/composables/useSignupForm";
import { computed } from "vue";

defineEmits(["on-go-next-btn-click"]);
const props = defineProps({
  isAllowedToGoNext: {
    type: Boolean
  }
});
const { isLoading } = useSignupForm();

const ctaGoNextIcon = computed(() =>
  isLoading.value ? "loading" : "arrow-right"
);
</script>

<template>
  <div class="signup-footer flex flex-col">
    <ProgressBar />
    <div class="signup-footer__cta flex flex-row justify-end p-10">
      <BaseButton
        magma-test-id="signup-footer-cta-go-to-next"
        :class="[
          'go-next-btn',
          'flex',
          'items-center',
          'justify-between',
          'gap-2',
          'bg-background-brand-emphasis'
        ]"
        @click="$emit('on-go-next-btn-click')"
        state="prmr"
        size="sm"
        type="submit"
        :text="$t(`generic.${isLoading ? 'loading' : 'continue'}`)"
        :disabled="!props.isAllowedToGoNext"
      >
        <BaseIcon
          :icon="ctaGoNextIcon"
          color="white"
          :class="{ 'animate-spin': isLoading }"
        />
      </BaseButton>
    </div>
  </div>
</template>
