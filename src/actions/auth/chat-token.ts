import apiClient, { SuccessResponse } from "~/lib/axios";

interface ChatToken {
  chat_token: string;
  initializer_message: string;
  user_name: string;
}

export const getChatToken = async () =>
  await apiClient
    .get<SuccessResponse<ChatToken>>("chat/initialize")
    .then((res) => res.data.data);
