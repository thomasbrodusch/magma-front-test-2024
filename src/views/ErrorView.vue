<script setup lang="ts">
// NPM
import type { PropType } from "vue";

// Components
import { BaseAvatar } from "magma-design-system-test";

// Props
defineProps({
  errorCode: {
    type: Number as PropType<number | null>,
    default: 404
  },
  campaignNotFound: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="flex h-screen flex-col bg-background-default pb-12 pt-16">
    <main
      class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8"
    >
      <div class="flex flex-shrink-0 justify-center">
        <RouterLink
          class="inline-flex h-12 w-12"
          :to="{
            name: 'campaigns'
          }"
        >
          <BaseAvatar src="/img/logo_magma.png" shape="squared" size="lg" />
        </RouterLink>
      </div>

      <div class="py-10">
        <div class="text-center">
          <p class="text-base font-semibold text-foreground-brand-default">
            {{ $t("errorView.error") + errorCode }}
          </p>

          <h1
            class="mt-2 text-4xl font-bold tracking-tight text-foreground-emphasis sm:text-5xl"
          >
            {{
              errorCode != 404
                ? $t("errorView.oops")
                : campaignNotFound
                  ? $t("errorView.campaignNotFound")
                  : $t("errorView.notFound")
            }}
          </h1>

          <p class="mt-2 text-base text-foreground-subtle">
            {{
              errorCode != 404
                ? $t("errorView.wrong")
                : campaignNotFound
                  ? $t("errorView.sorryCampaign")
                  : $t("errorView.sorry")
            }}
          </p>

          <div class="mt-6">
            <RouterLink
              class="text-base font-medium text-foreground-brand-default hover:text-border-default"
              :to="{
                name: 'campaigns'
              }"
            >
              {{ $t("errorView.home") }}<span aria-hidden="true"> &rarr;</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
