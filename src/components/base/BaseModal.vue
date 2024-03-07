<script setup lang="ts">
import { BaseIcon } from "magma-design-system-test";
import { useCommonStore } from "@/stores/common";
import useModal from "@/composables/useModal";
const emits = defineEmits(["on-close"]);
const props = defineProps({
  isLoading: {
    type: Boolean
  }
});

const { closeModal } = useModal();

function onClose() {
  if (!props.isLoading) {
    closeModal();
    emits("on-close");
  }
}
</script>

<template>
  <div class="base-modal h-full w-full z-1 flex items-center justify-center">
    <div
      class="base-modal__wrapper flex flex-col bg-background-default w-[480px] rounded-md"
    >
      <div class="base-modal__wrapper__header flex justify-between">
        <slot name="header"></slot>
        <BaseIcon
          class="cursor-pointer self-start"
          icon="close"
          color="#94A3B8"
          @click.stop="onClose"
        />
      </div>
      <div class="base-modal__wrapper__content py-[8px] px-[24px]">
        <slot name="content"></slot>
      </div>
      <div
        class="base-modal__wrapper__footer flex justify-end gap-[8px] pt-[16px] pr-[24px] pb-[24px] pl-[24px]"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base-modal {
  position: absolute;
  z-index: 1;
  margin: 0 auto;
  background: #0e1014b2;
}
.base-modal__wrapper__header {
  padding: 24px 24px 8px 24px;
}
.base-modal__wrapper__footer {
  padding: 16px 24px 24px 24px;
}
</style>
