// NPM
import { createI18n } from "vue-i18n";

// Locales
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export default createI18n({
  fallbackLocale: "en",
  globalInjection: true,
  legacy: false,
  locale: navigator.language.split("-")[0],
  messages: {
    en,
    fr,
  },
});
