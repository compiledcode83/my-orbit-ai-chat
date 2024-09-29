import apiClient, { SuccessResponse } from "~/lib/axios";

import type { SignInProps, SignInSuccess } from "./signin.interface";

export const signInMutationFn = async (data: SignInProps) =>
  await apiClient
    .post<SuccessResponse<SignInSuccess>>("auth/login-new", data)
    .then((res) => res.data);
