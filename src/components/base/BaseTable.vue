<script setup lang="ts">
import { BaseAvatar, BaseIcon } from "magma-design-system-test";

const emits = defineEmits(["on-remove-entry"]);
const props = defineProps({
  entries: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="base-datagrid">
    <div
      v-for="(entry, index) in props.entries"
      :class="[
        'base-datagrid__entry',
        'flex',
        'items-center',
        'px-[24px]',
        'py-[16px]',
        {
          'rounded-lg': props.entries.length === 1,
          'rounded-t-lg': props.entries.length > 1 && index === 0,
          'rounded-b-lg':
            props.entries.length > 1 && index === props.entries.length - 1
        }
      ]"
      :key="index"
    >
      <slot name="entry" :entry="entry"></slot>
    </div>
  </div>
</template>

<style scoped>
.base-datagrid__entry {
  border: 1px solid #cbd5e1;
}
.base-datagrid__entry:not(:first-child):not(:last-child) {
  border-top: none;
  border-bottom: none;
}
</style>
