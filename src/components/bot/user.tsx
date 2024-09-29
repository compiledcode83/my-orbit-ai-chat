import { BotInterface } from "~/schema/bot";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface Props {
  bot: BotInterface;
}

export default function User({ bot }: Props) {
  return (
    <button
      className={
        "flex w-full items-center gap-x-3 p-2 hover:bg-accent hover:text-accent-foreground"
      }
    >
      <Avatar>
        <AvatarImage src={bot.thumbnail ?? "/assets/profile.png"} />
        <AvatarFallback asChild>
          <img src="/assets/profile.png" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start gap-y-0">
        <h5>{bot.name}</h5>
        <small className="text-muted-foreground">{bot.description}</small>
      </div>
    </button>
  );
}

export const UserSkeleton = () => (
  <div className="flex items-center gap-x-3 p-2">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="flex flex-col gap-y-0">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-1 h-3 w-40" />
    </div>
  </div>
);
