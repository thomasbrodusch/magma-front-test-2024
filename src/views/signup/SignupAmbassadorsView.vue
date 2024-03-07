<script setup lang="ts">
// Components
import { BaseAvatar, BaseButton, BaseIcon } from "magma-design-system-test";
import AmbassadorRoundedProgress from "@/components/AmbassadorRoundedProgress.vue";
import useModal, { ModalName } from "@/composables/useModal";
import { useSignupAmbassador } from "@/composables/useSignup";
import BaseTable from "@/components/base/BaseTable.vue";
import { ambassadorInitial } from "@/helpers/AmbassadorHelper";

const { showModal } = useModal();
const { ambassadors, deleteAmbassador } = useSignupAmbassador();

const MAX_ALLOWED_AMBASSADORS = 5;
</script>

<template>
  <div class="signup-ambassador-view container">
    <div class="content">
      <div class="signup-ambassador-view__main flex flex-col gap-6">
        <h1 class="text-mgm-txt-xl font-medium">
          {{ $t("signupAmbassadorsView.heading") }}
        </h1>

        <div
          class="advice-intro flex flex-row items-start p-4 rounded-md gap-2 bg-background-warning-default"
        >
          <BaseIcon icon="alert-triangle" color="#b25504" />
          <p
            class="text-mgm-txt-sm"
            v-html="$t('signupAmbassadorsView.advice')"
          ></p>
        </div>

        <div
          class="card rounded-lg gap-8 p-6 flex flex-row aside-gradient text-foreground-on-emphasis"
        >
          <AmbassadorRoundedProgress
            magma-test-id="ambassador-rounded-progress"
            :count="ambassadors?.length ?? 0"
            :total="MAX_ALLOWED_AMBASSADORS"
          />
          <div class="card__cta flex flex-col gap-4 justify-center items-start">
            <p class="text-mgm-txt-sm">
              {{ $t("signupAmbassadorsView.description") }}
            </p>
            <BaseButton
              magma-test-id="show-add-ambassador-modal-cta"
              state="scdr"
              icon="plus"
              :text="$t('signupAmbassadorsView.cta')"
              :disabled="(ambassadors?.length || 0) == MAX_ALLOWED_AMBASSADORS"
              @click="showModal(ModalName.AddAmbassador)"
            />
          </div>
        </div>

        <div class="ambassador-datagrid flex flex-col gap-2">
          <h1 class="text-mgm-txt-md font-medium">{{ $t("generic.added") }}</h1>
          <BaseTable :entries="ambassadors">
            <template #entry="{ entry }">
              <div class="flex justify-start items-center gap-3 grow">
                <BaseAvatar
                  magma-test-id="table-ambassador-avatar"
                  :fallback="ambassadorInitial(entry)"
                />
                <p
                  magma-test-id="table-ambassador-display-name"
                  class="text-mgm-txt-sm capitalize"
                >
                  {{ entry.firstname }} {{ entry.lastname }}
                </p>
              </div>
              <div class="flex justify-between items-center grow">
                <p
                  magma-test-id="table-ambassador-email"
                  class="text-mgm-txt-sm text-foreground-default"
                >
                  {{ entry.email }}
                </p>

                <BaseIcon
                  magma-test-id="table-ambassador-remove"
                  class="cursor-pointer"
                  icon="trash"
                  @click="deleteAmbassador(entry.id)"
                />
              </div>
            </template>
          </BaseTable>
        </div>
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
