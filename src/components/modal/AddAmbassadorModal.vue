<script setup lang="ts">
import { BaseButton, BaseIcon, FieldInput } from "magma-design-system-test";
import BaseModal from "@/components/base/BaseModal.vue";
import useModal from "@/composables/useModal";
import { useSignupAmbassador } from "@/composables/useSignup";

const { closeModal } = useModal();

const {
  newAmbassador,
  validation,
  canAddAmbassador,
  createAmbassador,
  isLoading
} = useSignupAmbassador();

async function handleAddCta() {
  const ambassador = await createAmbassador();
  if (ambassador) {
    closeModal();
  }
}
</script>

<template>
  <BaseModal :is-loading="isLoading" magma-test-id="modal-ambassador">
    <template #header>
      <BaseIcon
        class="header-icon"
        icon="users-plus"
        color="#444CE7"
        bg-color="#E0EAFF"
        :size="24"
      />
    </template>
    <template #content>
      <div class="flex flex-col">
        <h1 class="text-mgm-txt-lg">{{ $t("signupAmbassadorsView.cta") }}</h1>
        <div class="form flex flex-col gap-[16px]">
          <div class="flex gap-[16px] w-full">
            <FieldInput
              magma-test-id="input-firstname"
              v-model="newAmbassador.firstname"
              :label="$t('generic.firstname')"
              placeholder="Nelson"
              :validation="validation.firstname"
              @blur="validation.firstname.$touch()"
              required
            />
            <FieldInput
              magma-test-id="input-firstname"
              v-model="newAmbassador.lastname"
              :label="$t('generic.lastname')"
              placeholder="Mandela"
              :validation="validation.lastname"
              @blur="validation.lastname.$touch()"
              required
            />
          </div>
          <FieldInput
            magma-test-id="input-email"
            v-model="newAmbassador.email"
            :label="$t('generic.email')"
            :validation="validation.email"
            icon="mail"
            placeholder="nelson.mandela@gmail.com"
            @blur="validation.email.$touch()"
            required
          />
        </div>
      </div>
    </template>
    <template #footer>
      <BaseButton
        state="scdr"
        :text="$t('generic.cancel')"
        @click="closeModal"
      />
      <BaseButton
        :class="['flex', 'items-center', 'justify-between', 'gap-2']"
        state="prmr"
        :disabled="!canAddAmbassador"
        :text="$t(`generic.${isLoading ? 'loading' : 'add'}`)"
        @click="handleAddCta"
      >
        <BaseIcon
          v-if="isLoading"
          class="animate-spin"
          icon="loading"
          color="white"
        />
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped>
.header-icon {
  border-radius: 100px;
  border: 8px solid #eef4ff;
}
</style>
