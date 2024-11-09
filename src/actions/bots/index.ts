import apiClient, { SuccessResponse } from "~/lib/axios";
import { BotInterface, SelectBotResponse } from "~/schema/bot";
import { upsertEnabledBotsState } from "~/store/bots";
import { upsertRecommendedBotsState } from "~/store/bots/recommended";

export const getUserEnabledBots = async () =>
  await apiClient
    .get<SuccessResponse<BotInterface[]>>("bots")
    .then((res) =>
      upsertEnabledBotsState(res.data.data.filter((bot) => bot.enabled)),
    );

export const getRecommendedBots = async () =>
  await apiClient
    .get<SuccessResponse<BotInterface[]>>("bots/whos-hot")
    .then((res) =>
      upsertRecommendedBotsState(res.data.data.filter((bot) => !bot.enabled)),
    );

export const selectBot = async (botId: number) =>
  await apiClient.post<SelectBotResponse>("bots/select", { bot_id: botId });
