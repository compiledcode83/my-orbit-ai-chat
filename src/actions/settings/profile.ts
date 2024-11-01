import apiClient, { SuccessResponse } from "~/lib/axios";
import { TProfileSchema } from "~/schema/settings";
import { setProfileImage } from "~/store/persist-storage/user";
import { setUserDetails } from "~/store/settings/user-details";

export const getUserDetails = async () =>
  await apiClient
    .get<SuccessResponse<TProfileSchema>>("user-profile")
    .then((res) => setUserDetails(res.data.data));

export const profileMutationFn = async (data: TProfileSchema) =>
  await apiClient
    .put<SuccessResponse<TProfileSchema>>("user-profile", data)
    .then((res) => setUserDetails(res.data.data));

export const pictureMutationFn = async (file: File) => {
  const formData = new FormData();
  formData.append("profilePhoto", file);

  await apiClient
    .post("user-profile-picture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      setProfileImage(res.data.data.url);
      return res.data;
    });
};
