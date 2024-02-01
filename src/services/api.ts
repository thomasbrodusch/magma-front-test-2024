// NPM
import axios from "axios";

import type { SignupData } from "./api.constants";

const instances = {
  technicalTest: axios.create({
    baseURL: import.meta.env.VITE_MAGMA_API_TECHNICAL_TEST,
  })
};

// Export the API factory for each endpoint
export default class Api {
  public static technicalTest() {
    return {
    };
  }
}
