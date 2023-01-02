import "i18next";

import type common from "../public/locales/en/common.json";
import type login from "../public/locales/en/login.json";
import type home from "../public/locales/en/home.json";

interface I18nNamespaces {
  common: typeof common;
  login: typeof login;
  home: typeof home;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: I18nNamespaces;
  }
}
