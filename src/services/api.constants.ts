import type { SignUp } from "@/types/Signup";

export interface SignupData {
  data: SignUp;
}

export enum ApiErrorType {
  MissingField = "MISSING_FIELDS"
}

export type ApiError = {
  message: string;
  error: string;
  errorType: ApiErrorType;
};
