import { useCommonStore } from "@/stores/common";
import { computed } from "vue";
import AddAmbassadorModal from "@/components/modal/AddAmbassadorModal.vue";

export enum ModalName {
  AddAmbassador = "add-ambassador"
}

export default function useModal() {
  const store = useCommonStore();

  const activeModalComponent = computed(
    () =>
      ({
        "add-ambassador": AddAmbassadorModal
      })[store.shellModal.name]
  );

  function showModal(modalName: ModalName) {
    store.setShellModal(modalName);
  }

  function closeModal() {
    store.resetShellModal();
  }

  return { activeModalComponent, showModal, closeModal };
}
