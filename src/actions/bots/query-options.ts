import { queryOptions } from "@tanstack/react-query";

import { getRecommendedBots, getUserEnabledBots } from "./index";

export const userEnabledBotsQueryOptions = queryOptions({
  queryKey: ["your-avatar"],
  queryFn: getUserEnabledBots,
});

export const recommendedBotsQueryOptions = queryOptions({
  queryKey: ["recommended-bots"],
  queryFn: getRecommendedBots,
});
