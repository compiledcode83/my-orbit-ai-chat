import apiClient, { SuccessResponse } from "~/lib/axios";
import { ContactInterface, InteractionContactInterface } from "~/schema/user";
import { setContacts } from "~/store/connect/contact";
import { setInteractions } from "~/store/connect/interactions";

export const getMyContacts = async () =>
  await apiClient
    .get<
      SuccessResponse<{ contacts: ContactInterface[] }>
    >("connect/get_contacts")
    .then((res) => setContacts(res.data.data.contacts));

export const getMyInteractions = async () =>
  await apiClient
    .get<
      SuccessResponse<{ contacts: InteractionContactInterface[] }>
    >("connect/get_interactions")
    .then((res) => setInteractions(res.data.data.contacts));
