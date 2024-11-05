import { cn } from "~/lib/utils";
import { ContactInterface, InteractionContactInterface } from "~/schema/user";

import VoiceCall from "../call";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface Props {
  contact: InteractionContactInterface | ContactInterface;
}

export default function ConnectAvatar({ contact }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={"flex w-full items-center gap-x-3 px-2 py-3"}>
          <div className="relative">
            <Avatar>
              <AvatarImage
                src={contact.Profile_image ?? "/assets/profile.png"}
              />
              <AvatarFallback asChild>
                <img src="/assets/profile.png" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col items-start gap-y-0 text-left">
            <div className="flex items-center gap-x-2">
              <p className="line-clamp-1 font-semibold leading-5">
                {contact.Name}
              </p>

              {"parody" in contact && contact.parody ? (
                <img
                  src={"/assets/avatar/parody-avatar.svg"}
                  height={16}
                  width={16}
                  className="m-auto"
                />
              ) : null}

              {"Verified" in contact && contact.Verified ? (
                <img
                  src={"/assets/avatar/verified-avatar.svg"}
                  height={16}
                  width={16}
                />
              ) : null}
            </div>

            <small className="line-clamp-1 text-muted-foreground">
              {contact.status.trim()}
            </small>
          </div>

          {"is_online" in contact && contact.is_online ? (
            <div className="ml-auto flex items-center gap-x-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  contact.is_online ? "bg-[#409022]" : "bg-[#E33030]",
                )}
              />

              <p
                className={cn(
                  contact.is_online ? "text-[#409022]" : "text-[#E33030]",
                )}
              >
                {contact.is_online ? "ONLINE" : "OFFLINE"}
              </p>
            </div>
          ) : null}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="relative pl-48">
          <Avatar className="absolute -top-16 left-0 size-44 bg-black">
            <AvatarImage src={contact.Profile_image ?? "/assets/profile.png"} />

            <AvatarFallback asChild>
              <img src="/assets/profile.png" />
            </AvatarFallback>
          </Avatar>

          <DialogTitle>{contact.Name}</DialogTitle>
          <DialogDescription className="line-clamp-2">
            {contact.status}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-16">
          <Label className="uppercase text-muted-foreground">
            HOW YOU LINK WITH {contact.Name}
          </Label>
          <Separator className="mt-1" />
        </div>

        <VoiceCall
          receiver={"user_id" in contact ? contact.user_id : contact.bot_id}
        />
      </DialogContent>
    </Dialog>
  );
}

export const ConnectAvatarSkeleton = () => (
  <div className="flex items-center gap-x-3 px-2 py-3">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="flex flex-col gap-y-0">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-1 h-3 w-40" />
    </div>
  </div>
);
