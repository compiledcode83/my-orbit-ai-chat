import { useQuery } from "@tanstack/react-query";

import { userEnabledBotsQueryOptions } from "~/actions/auth/bots";
import User, { UserSkeleton } from "~/components/bot/user";
import useEnabledBotsStore from "~/store/bots";

export default function YourAvatarPanel() {
  const enabledBots = useEnabledBotsStore.use.data();

  const { isPending } = useQuery(userEnabledBotsQueryOptions);

  if (isPending && !enabledBots)
    return (
      <>
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
      </>
    );

  if (!enabledBots) return null;
  return enabledBots.map((bot) => <User bot={bot} />);
}
