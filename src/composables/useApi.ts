import Api from "@/services/api";

const $api = new Api();

export default function useApi() {
  return {
    $api
  };
}
