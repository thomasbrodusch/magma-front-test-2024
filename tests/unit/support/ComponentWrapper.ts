import { mount, VueWrapper } from "@vue/test-utils";
import type { Stubs } from "@vue/test-utils/dist/types";
import type { App, ComponentPublicInstance, Directive, Plugin } from "vue";
import { createPinia } from "pinia";

const $t = (tKey: string, args?: Record<string, string | number>) =>
  args ? `${tKey}_${JSON.stringify(args)}` : tKey;

const translateMock: Plugin = {
  install: (app: App) => (app.config.globalProperties.$t = $t)
};

const i18nMock = {
  install: (app: App) =>
    (app.config.globalProperties.$i18n = {
      locale: "en",
      t: () => vi.fn(),
      tc: () => vi.fn()
    })
};

export type ComponentWrapperOptions = {
  shallow?: boolean;
  props?: Record<string, unknown>;
  slots?: Record<string, unknown>;
  data?: Record<string, unknown>;
  mocks?: Record<string, unknown>;
  stubs?: Stubs;
  components?: Record<string, ComponentPublicInstance>;
  plugins?: Plugin[];
  provide?: Record<string, unknown>;
  directives?: Record<string, Directive>;
};

export default class ComponentWrapper {
  public declare impl: VueWrapper;

  constructor(
    component: Record<string, unknown>,
    options: ComponentWrapperOptions = {}
  ) {
    const {
      shallow = true,
      slots = {},
      props,
      data = {},
      components = {},
      mocks,
      stubs,
      plugins = [],
      provide = {},
      directives = {}
    } = options ?? {};

    this.impl = mount(component, {
      shallow,
      global: {
        plugins: [translateMock, i18nMock, createPinia()].concat(plugins),
        components,
        stubs,
        mocks,
        provide,
        directives
      },
      props,
      slots,
      data: () => data
    });
  }

  findByTestId(magmaTestId: string, returnComponent?: boolean) {
    return returnComponent
      ? this.impl.findComponent(`[magma-test-id="${magmaTestId}"]`)
      : this.impl.find(`[magma-test-id="${magmaTestId}"]`);
  }
}
