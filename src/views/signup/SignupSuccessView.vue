<script setup lang="ts">
// Components
import { BaseAvatar } from "magma-design-system-test";
import BaseTable from "@/components/base/BaseTable.vue";

import { useSignupAmbassador } from "@/composables/useSignup";
import useOrganization from "@/composables/useOrganization";
import { ambassadorInitial } from "@/helpers/AmbassadorHelper";

const { ambassadors } = useSignupAmbassador();
const { currentOrganization } = useOrganization();
</script>

<template>
  <div class="signup-success-view container">
    <div class="content">
      <div class="signup-success-view__main flex flex-col gap-6">
        <h1 class="text-mgm-txt-xl font-medium">
          ✨{{ $t("signupSuccessView.heading") }}
        </h1>
        <p
          v-html="
            $t(
              'signupSuccessView.description',
              {
                name: currentOrganization?.name,
                totalAmbassadors: ambassadors.length
              },
              {
                plural: ambassadors.length
              }
            )
          "
        ></p>
        <BaseTable :entries="ambassadors">
          <template #entry="{ entry }">
            <div class="flex justify-start items-center gap-3 grow">
              <BaseAvatar :fallback="ambassadorInitial(entry)" />
              <p class="text-mgm-txt-sm capitalize">
                {{ entry.firstname }} {{ entry.lastname }}
              </p>
            </div>
            <div class="flex justify-between items-center grow">
              <p class="text-mgm-txt-sm text-foreground-default">
                {{ entry.email }}
              </p>
            </div>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0px 0px 0px 1px #0610ccc2;
  box-shadow: 0px 1px 2px 0px #0e103866;
  background: linear-gradient(0deg, #444ce7, #444ce7),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.16) 0%,
      rgba(255, 255, 255, 0) 100%
    );
}
</style>
