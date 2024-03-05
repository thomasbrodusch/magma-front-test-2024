(
<script setup lang="ts">
// Components
import { FieldAvatarUploader, FieldInput } from "magma-design-system-test";
import useSignupForm from "@/composables/useSignupForm";
import SignupIllustration from "@/components/SignupIllustration.vue";

const ORGANIZATION_NAME_PLACEHOLDER = "Acme inc.";
const ORGANIZATION_WEBSITE_PLACEHOLDER = "https://acme.com";

const { formOrganization, logoPreviewURL, validation } = useSignupForm();
function handleOrganizationNameBlur(name: string) {
  formOrganization.name = name;
  validation.value.name.$touch();
}
</script>

<template>
  <div class="signup-organization-view container">
    <div class="content">
      <div class="signup-organization-view__main flex flex-col gap-6">
        <h1 class="text-mgm-txt-xl">
          {{ $t("signupOrganizationView.heading") }}
        </h1>
        <FieldInput
          magma-test-id="input-name"
          :model-value="formOrganization.name"
          :label="$t('signupOrganizationView.form.organization')"
          :placeholder="ORGANIZATION_NAME_PLACEHOLDER"
          :validation="validation.name"
          @blur="handleOrganizationNameBlur"
          required
        />
        <FieldInput
          magma-test-id="input-website"
          v-model="validation.website.$model"
          :label="$t('generic.website')"
          :placeholder="ORGANIZATION_WEBSITE_PLACEHOLDER"
          :validation="validation.website"
          @blur="validation.website.$touch()"
          required
        />
        <FieldAvatarUploader
          magma-test-id="input-logo"
          id="organization-logo-uploader"
          v-model="validation.logoFile.$model"
          label="Logo"
          :validation="validation.logoFile"
          :preview-url="logoPreviewURL"
          :cta="$t('signupProfileView.form.avatar.cta')"
          :description="$t('signupProfileView.form.avatar.description')"
        />
      </div>
      <SignupIllustration
        magma-test-id="svg-illustration"
        class="signup-organization-view__illustration"
        :logo-preview-url="logoPreviewURL"
        :organization-name="
          formOrganization.name || ORGANIZATION_NAME_PLACEHOLDER
        "
      />
    </div>
  </div>
</template>
