import type { Organization } from "@/types/Organization";
import type { Ambassador } from "@/types/Ambassador";

export interface SignUp {
  organizationName: Organization["name"] | null;
  website: Organization["website"] | null;
  logoUrl: Organization["logoUrl"] | null;
  ambassadors: Ambassador[];
}
