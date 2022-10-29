import i18n from "i18next";
import common_cn from "./cn/common.json";
import common_en from "./en/common.json";
import common_kr from "./kr/common.json";
i18n.init({
  resources: {
    en: {
      translations: common_en,
    },
    cn: {
      translations: common_cn,
    },
    kr: {
      translations: common_kr,
    },
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ",",
  },

  react: {
    wait: true,
  },
});
export default i18n;
