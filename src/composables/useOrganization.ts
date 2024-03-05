import { ref, type Ref } from "vue";
import type { Organization } from "@/types/Organization";

const currentOrganization: Ref<Organization | undefined> = ref();

export default function useOrganization() {
  function setCurrentOrganization(organization: Organization) {
    currentOrganization.value = organization;
  }
  return { currentOrganization, setCurrentOrganization };
}
