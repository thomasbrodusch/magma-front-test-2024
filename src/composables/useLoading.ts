import { computed, ref } from "vue";

enum LoadingState {
  Init = "init",
  Pending = "pending",
  Success = "success",
  Fail = "failed"
}
export default function useLoading() {
  const loadingState = ref<LoadingState>(LoadingState.Init);

  const isLoading = computed(() => loadingState.value === LoadingState.Pending);
  const isLoadingSucceed = computed(
    () => loadingState.value === LoadingState.Success
  );
  const isLoadingFailed = computed(
    () => loadingState.value === LoadingState.Fail
  );

  function setLoadingPending() {
    loadingState.value = LoadingState.Pending;
  }
  function setLoadingSuccess() {
    loadingState.value = LoadingState.Success;
  }
  function setLoadingFailed() {
    loadingState.value = LoadingState.Fail;
  }
  return {
    isLoading,
    isLoadingSucceed,
    isLoadingFailed,
    setLoadingPending,
    setLoadingSuccess,
    setLoadingFailed
  };
}
