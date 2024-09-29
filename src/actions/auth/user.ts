import apiClient, { SuccessResponse } from "~/lib/axios";
import { UserInterface } from "~/schema/user";

export const getProfile = async () =>
  await apiClient
    .get<SuccessResponse<UserInterface>>("auth/get-user-new")
    .then((res) => res.data);
