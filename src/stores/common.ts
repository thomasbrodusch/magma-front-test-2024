// NPM
import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => {
    return {
      alert: {
        props: {},
      },
      bulk: {
        props: {},
      },
      modal: {
        props: {},
      },
      selectedRows: {} as { [key: string]: boolean },
      shellModal: {
        name: "",
        props: {},
      },
      panel: {
        name: "",
        props: {},
      },
    };
  },

  actions: {
    setShellModal(name: string, props?: { [key: string]: any }) {
      this.shellModal.name = name;
      this.shellModal.props = props || {};
    },

    resetShellModal() {
      this.shellModal = {
        name: "",
        props: {},
      };
    },
  },
});
