import type { SignUp } from "@/types/Signup";

export interface SignupData {
  data: SignUp;
}

export enum ApiErrorType {
  MissingField = "MISSING_FIELDS",
  ErrorCreateOrganization = "ERROR-TEST-SIGNUP-ORGANIZATION",
  ErrorCreateAmbassador = "ERROR-TEST-CREATE-AMBASSADOR",
  ErrorDeleteAmbassador = "ERROR-TEST-DELETE-AMBASSADOR"
}

export type ApiError = {
  message: string;
  error: string;
  errorType: ApiErrorType;
};
