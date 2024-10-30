import apiClient from "~/lib/axios";
import { TUpdatePasswordSchema } from "~/schema/settings";

export const changePasswordMutationFn = async (data: TUpdatePasswordSchema) =>
  await apiClient
    .post("user/account/v1/change-password", data)
    .then((res) => res.data);
