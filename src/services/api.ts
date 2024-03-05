// NPM
import axios from "axios";

import type { SignupData, ApiError } from "./api.constants";
import type { Organization } from "@/types/Organization";

const instances = {
  technicalTest: axios.create({
    baseURL: import.meta.env.VITE_MAGMA_API_TECHNICAL_TEST
  })
};

export type ApiClass = {
  technicalTest(): {
    createOrganization(
      signupData: Partial<SignupData["data"]>,
      logoFile?: File
    ): Promise<Organization | undefined>;
  };
};

// Export the API factory for each endpoint
export default class Api implements ApiClass {
  technicalTest() {
    const { technicalTest: endpoint } = instances;

    async function createOrganization(
      signupData: Partial<SignupData["data"]>,
      logoFile?: File
    ): Promise<Organization | undefined> {
      try {
        const { organizationName, website } = signupData;
        const response = await endpoint.postForm("/organization", {
          organizationData: { name: organizationName, website },
          logo: logoFile
        });
        if (response.data?.error as ApiError) {
          throw new Error(response.data.errorType);
        }
        return response.data;
      } catch (e) {
        // idea improvement: log error type in a logger.
      }
    }

    return {
      createOrganization
    };
  }
}
