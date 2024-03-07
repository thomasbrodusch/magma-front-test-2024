<script setup lang="ts">
import { BaseButton, BaseIcon } from "magma-design-system-test";
import ProgressBar from "@/components/shell/ProgressBar.vue";
import { useSignupOrganization } from "@/composables/useSignup";
import { computed } from "vue";
import { between } from "@vuelidate/validators";

defineEmits(["on-go-prev-btn-click", "on-go-next-btn-click"]);
const props = defineProps({
  showGoPrev: {
    type: Boolean
  },
  isAllowedToGoNext: {
    type: Boolean
  }
});
const { isLoading } = useSignupOrganization();
</script>

<template>
  <div class="signup-footer flex flex-col">
    <ProgressBar />
    <div
      :class="[
        'signup-footer__cta',
        'flex',
        'flex-row',
        `justify-${props.showGoPrev ? 'between' : 'end'}`,
        'p-10'
      ]"
    >
      <BaseButton
        v-if="showGoPrev"
        magma-test-id="signup-footer-cta-go-to-prev"
        class="go-prev-btn"
        @click="$emit('on-go-prev-btn-click')"
        state="scdr"
        size="sm"
        type="submit"
        icon="arrow-left"
        :text="$t(`generic.back`)"
      >
      </BaseButton>

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
          :icon="isLoading ? 'loading' : 'arrow-right'"
          color="white"
          :class="{ 'animate-spin': isLoading }"
        />
      </BaseButton>
    </div>
  </div>
</template>
