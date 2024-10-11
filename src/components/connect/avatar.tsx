import { cn } from "~/lib/utils";
import { ContactInterface, InteractionContactInterface } from "~/schema/user";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  contact: InteractionContactInterface | ContactInterface;
}

export default function ConnectAvatar({ contact }: Props) {
  return (
    <button className={"flex w-full items-center gap-x-3 px-2 py-3"}>
      <div className="relative">
        <Avatar>
          <AvatarImage src={contact.Profile_image ?? "/assets/profile.png"} />
          <AvatarFallback asChild>
            <img src="/assets/profile.png" />
          </AvatarFallback>
        </Avatar>

        {/* {bot.parody ? ( */}
        {/*   <div className="absolute -right-1 -top-1 z-20 flex size-5 rounded-full bg-white shadow-md"> */}
        {/*     <img */}
        {/*       src={"/assets/avatar/parody-avatar.svg"} */}
        {/*       height={14} */}
        {/*       width={14} */}
        {/*       className="m-auto" */}
        {/*     /> */}
        {/*   </div> */}
        {/* ) : null} */}
      </div>

      <div className="flex flex-col items-start gap-y-0 text-left">
        <div className="flex items-center gap-x-2">
          <p className="line-clamp-1 font-semibold leading-5">{contact.Name}</p>

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
  );
}
