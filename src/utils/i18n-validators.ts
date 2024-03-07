import * as validators from "@vuelidate/validators";
import i18n from "@/plugins/i18n";
import { createI18nMessage } from "@vuelidate/validators";

const withI18nMessage = createI18nMessage({
  t: i18n.global.t.bind(i18n)
});

export const required = withI18nMessage(validators.required, {
  withArguments: true
});

export const url = withI18nMessage(validators.url);
export const email = withI18nMessage(validators.email);

export const magmaLogoFileTypeValidation = withI18nMessage(
  (file: File) => {
    if (!file) {
      return true;
    }
    return ["image/jpeg", "image/png"].includes(file.type);
  },
  { messagePath: () => "validations.picture.type" }
);

export const magmaLogoFileSizeValidation = withI18nMessage(
  (file: File) => {
    if (!file) {
      return true;
    }
    const MAX_FILE_SIZE_IN_MB = 5;
    const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE_IN_MB * Math.pow(2, 20); // 1 MB = 2^20 Bytes in base 2

    return file.size < MAX_FILE_SIZE_IN_BYTES;
  },
  {
    messagePath: () => "validations.picture.size",
    messageParams(params) {
      return {
        ...params,
        maxSize: "5MB"
      };
    }
  }
);
