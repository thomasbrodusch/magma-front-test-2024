<script setup lang="ts">
// NPM
import { onBeforeMount, onErrorCaptured, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import { AxiosError } from "axios";

// Components
import ErrorView from "@/views/ErrorView.vue";

// Plugins
const route = useRoute();

// Reactive variables
const error = ref<Error | AxiosError | null>(null);
const errorCode = ref<number | null>(null);
const initialized = ref(false);

// Lifecycle hooks
onBeforeMount(async () => {
  initialized.value = true;
});

// Listeners
onErrorCaptured((e: AxiosError) => {
  error.value = e;

  if (e.response) {
    errorCode.value = e.response.status;
  }

  return true;
});
</script>

<template>
  <template v-if="initialized">
    <ErrorView v-if="error" :error-code="errorCode" />

    <template v-else>
      <RouterView
        :class="[
          'min-h-screen bg-background-default',
          {
            'ml-20':
              !['error', 'expired-link', 'login'].includes(
                route?.name as string
              ) && !route?.path.startsWith('/sign-up'),
            'xl:ml-64':
              !['error', 'expired-link', 'login'].includes(
                route?.name as string
              ) && !route?.path.startsWith('/sign-up')
          }
        ]"
      />
    </template>
  </template>
</template>
