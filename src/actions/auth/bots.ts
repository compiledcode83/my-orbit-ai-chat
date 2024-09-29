import { queryOptions } from "@tanstack/react-query";

import apiClient, { SuccessResponse } from "~/lib/axios";
import { BotInterface } from "~/schema/bot";
import { upsertEnabledBotsState } from "~/store/bots";

export const getUserEnabledBots = async () =>
  await apiClient
    .get<SuccessResponse<BotInterface[]>>("bots")
    .then((res) => upsertEnabledBotsState(res.data.data));

export const userEnabledBotsQueryOptions = queryOptions({
  queryKey: ["your-avatar"],
  queryFn: getUserEnabledBots,
});
