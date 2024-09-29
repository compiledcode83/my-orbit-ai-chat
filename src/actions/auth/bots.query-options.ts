import { queryOptions } from "@tanstack/react-query";

import { getRecommendedBots, getUserEnabledBots } from "./bots";

export const userEnabledBotsQueryOptions = queryOptions({
  queryKey: ["your-avatar"],
  queryFn: getUserEnabledBots,
});

export const recommendedBotsQueryOptions = queryOptions({
  queryKey: ["recommended-bots"],
  queryFn: getRecommendedBots,
});
