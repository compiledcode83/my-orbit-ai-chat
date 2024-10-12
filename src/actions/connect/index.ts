import apiClient, { SuccessResponse } from "~/lib/axios";
import { CallDetailInterface, StartCallInterface } from "~/schema/connect";

type StartCallResponse = SuccessResponse<{ call_id: string }>;

export const startCall = async (data: StartCallInterface) =>
  await apiClient
    .post<StartCallResponse>("connect/start_call", data)
    .then((res) => res.data.data.call_id);

export const getCallDetails = async (callId: string) =>
  await apiClient
    .get<SuccessResponse<CallDetailInterface[]>>(`connect/call_data/${callId}`)
    .then((res) => res.data.data);
