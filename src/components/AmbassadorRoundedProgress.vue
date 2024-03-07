<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  count: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 5
  }
});

const CIRCUM_RATIO = 45;
const progressPercent = computed(() => (props.count / props.total) * 100);
const circum = computed(() => Math.PI * 2 * CIRCUM_RATIO);
const roundDashArray = computed(
  () => (circum.value * progressPercent.value) / 100
);
</script>

<template>
  <svg
    width="126"
    height="103"
    viewBox="0 0 126 103"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M111 99C118.535 88.9717 123 76.5054 123 62.9963C123 29.8613 96.1371 3 63 3C29.8629 3 3 29.8613 3 62.9963C3 76.5054 7.46507 88.9717 15 99"
      stroke="#A4BCFD"
      stroke-width="6"
      stroke-linecap="round"
      stroke-dasharray="12 12"
    />

    <path
      d="M111 99C118.535 88.9717 123 76.5054 123 62.9963C123 29.8613 96.1371 3 63 3C29.8629 3 3 29.8613 3 62.9963C3 76.5054 7.46507 88.9717 15 99"
      stroke="white"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-dasharray="`${roundDashArray} 999`"
      style="transform: scaleX(-1) translateX(-126px)"
    />

    <text
      magma-test-id="ambassador-rounded-progress-count"
      x="34"
      y="79"
      class="text-mgm-dspl-lg"
      fill="white"
    >
      {{ props.count }}
    </text>
    <path
      d="M69 77.5L75 64.5"
      stroke="#A4BCFD"
      stroke-width="1.5"
      stroke-linecap="round"
    />

    <text
      magma-test-id="ambassador-rounded-progress-total"
      x="80"
      y="79"
      class="text-mgm-txt-xl"
      fill="#A4BCFD"
    >
      {{ props.total }}
    </text>
  </svg>
</template>
