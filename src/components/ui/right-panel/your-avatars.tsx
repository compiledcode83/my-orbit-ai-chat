import { useQuery } from "@tanstack/react-query";

import { userEnabledBotsQueryOptions } from "~/actions/auth/bots.query-options";
import User, { UserSkeleton } from "~/components/bot/user";
import useEnabledBotsStore from "~/store/bots";

export default function YourAvatarPanel() {
  const enabledBots = useEnabledBotsStore.use.data();
  const { isPending } = useQuery(userEnabledBotsQueryOptions);

  if (isPending && !enabledBots)
    return (
      <div className="px-4">
        <UserSkeleton />
        <UserSkeleton />
      </div>
    );

  if (!enabledBots) {
    return null;
  }

  return enabledBots.map((bot) => (
    <div className="px-4 hover:bg-primary/5">
      <User bot={bot} />
    </div>
  ));
}
