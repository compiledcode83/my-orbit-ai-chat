import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ArrowDownToLine, Loader } from "lucide-react";

import { selectBot } from "~/actions/bots";
import { BotInterface } from "~/schema/bot";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface Props {
  bot: BotInterface;
}

export default function User({ bot }: Props) {
  const router = useRouter();

  const { mutate: selectBotMutate, isPending } = useMutation({
    mutationFn: selectBot,
    onSuccess: () => router.history.go(0), // hard refresh
  });

  const handleSelectBot = () => {
    selectBotMutate(bot.id);
  };

  return (
    <button className={"flex h-16 w-full items-center gap-x-3 p-2"}>
      <div className="relative">
        <Avatar>
          <AvatarImage src={bot.thumbnail ?? "/assets/profile.png"} />
          <AvatarFallback asChild>
            <img src="/assets/profile.png" />
          </AvatarFallback>
        </Avatar>

        {bot.parody ? (
          <div className="absolute -right-1 -top-1 z-20 flex size-5 rounded-full bg-white shadow-md">
            <img
              src={"/assets/avatar/parody-avatar.svg"}
              height={14}
              width={14}
              className="m-auto"
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-shrink flex-col items-start gap-y-0 text-left">
        <h5 className="line-clamp-1 leading-5">{bot.name}</h5>
        <small className="line-clamp-1 text-muted-foreground">
          {bot.description.trim()}
        </small>
      </div>

      {!bot.enabled ? (
        isPending ? (
          <Loader className="m-auto mr-2 size-4 animate-spin" />
        ) : (
          <button
            onClick={handleSelectBot}
            className="ml-auto flex h-12 rounded-full border"
          >
            <ArrowDownToLine className="m-auto mx-2 size-4" />
          </button>
        )
      ) : null}
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
