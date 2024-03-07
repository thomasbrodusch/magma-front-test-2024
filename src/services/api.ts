// NPM
import axios from "axios";

import type { SignupData, ApiError } from "./api.constants";
import type { Organization } from "@/types/Organization";
import type { Ambassador } from "@/types/Ambassador";

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

    async function createAmbassador(
      organizationId: Organization["id"],
      ambassador: Partial<Ambassador>
    ): Promise<Ambassador | undefined> {
      try {
        const { firstname, lastname, email } = ambassador;
        const response = await endpoint.post("/ambassador", {
          organizationId,
          firstname,
          lastname,
          email
        });
        if (response.data?.error as ApiError) {
          throw new Error(response.data.errorType);
        }
        return response.data;
      } catch (e) {
        // idea improvement: log error type in a logger.
      }
    }

    async function deleteAmbassador(
      ambassadorId: Ambassador["id"]
    ): Promise<Ambassador | undefined> {
      try {
        const response = await endpoint.delete(`/ambassador/${ambassadorId}`);
        if (response.data?.error as ApiError) {
          throw new Error(response.data.errorType);
        }
        return response.data;
      } catch (e) {
        // idea improvement: log error type in a logger.
      }
    }

    return {
      createOrganization,
      createAmbassador,
      deleteAmbassador
    };
  }
}
