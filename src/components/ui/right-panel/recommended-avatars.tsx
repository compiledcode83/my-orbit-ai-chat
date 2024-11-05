import { useQuery } from "@tanstack/react-query";

import { recommendedBotsQueryOptions } from "~/actions/bots/query-options";
import User, { UserSkeleton } from "~/components/bot/user";
import useRecommenedBotsStore from "~/store/bots/recommended";

export default function RecommendedAvatars() {
  const recommendedBots = useRecommenedBotsStore.use.data();
  const { isPending } = useQuery(recommendedBotsQueryOptions);

  if (isPending && !recommendedBots)
    return (
      <div className="px-4">
        <UserSkeleton />
      </div>
    );

  if (!recommendedBots) {
    return null;
  }

  return recommendedBots.map((bot) => (
    <div className="px-2 hover:bg-primary/5">
      <User bot={bot} />
    </div>
  ));
}
