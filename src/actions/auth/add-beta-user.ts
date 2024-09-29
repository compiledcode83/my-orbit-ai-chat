import apiClient, { SuccessResponse } from "~/lib/axios";
import type { TGetADemoSchema } from "~/schema/auth";

export const betaAccessMutationFn = (values: TGetADemoSchema) =>
  apiClient
    .post<SuccessResponse<string>>("auth/add_beta_user", values)
    .then((res) => res.data);
