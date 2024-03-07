import useOrganization from "@/composables/useOrganization";
import { SignupStep } from "@/composables/useSignupRouting";

export default function SignupGuard(to, from, next) {
  const { currentOrganization } = useOrganization();
  if (!currentOrganization.value) {
    return next({ name: SignupStep.Organization });
  }
  return next();
}
