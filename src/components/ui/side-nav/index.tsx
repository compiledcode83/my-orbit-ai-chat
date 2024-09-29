import { Link } from "@tanstack/react-router";
import {
  LogOut,
  MenuIcon,
  MessageSquareText,
  PencilRuler,
  Store,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import useUserStore, { logout } from "~/store/persist-storage/user";
import { Separator } from "../separator";
import SideNavItem, { SideNavItemProps } from "./side-nav-item";
import BottomSideNav from "./bottom-side-nav";
import { Button } from "../button";
import { useState } from "react";
import { cn } from "~/lib/utils";

const menuItems: SideNavItemProps[] = [
  {
    name: "Chat",
    path: "/chat/my-orbit",
    Icon: MessageSquareText,
  },
  {
    name: "Store",
    path: "/store/overview",
    Icon: Store,
  },
  {
    name: "Create",
    path: "/create",
    Icon: PencilRuler,
  },
];

const bottomMenuItems: SideNavItemProps[] = [
  { name: "Log Out", action: logout, Icon: LogOut },
];

export default function SideNav() {
  const [minimized, setIsMinimized] = useState(false);
  const user = useUserStore.use.data();

  return (
    <aside
      className={cn(
        "shadow-md flex flex-col items-start h-screen bg-white py-4 gap-y-4",
        minimized ? "w-14" : "w-[248px]",
      )}
    >
      <div className="flex w-full items-center px-4 justify-between">
        {minimized ? null : (
          <Link
            to="/chat/my-orbit"
            className="main-logo flex shrink-0 items-center"
          >
            <img
              className="left-5 top-5 h-9"
              src="/assets/logos/my-orbit-logo.svg"
              alt="MyOrbitAi"
            />
          </Link>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={() => setIsMinimized((prev) => !prev)}
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="flex flex-1 justify-between w-full mt-4 flex-col gap-y-6">
        {/* Menu Items */}
        <ul>
          {menuItems.map((item) => (
            <li key={item.path + "side-nav"}>
              <SideNavItem item={{ ...item, minimized }} />
            </li>
          ))}
        </ul>

        {/* User Info */}
        {user ? (
          <div
            className={cn(
              "px-5 flex justify-start items-center mt-auto gap-x-3",
              minimized && "px-0 justify-center items-center",
            )}
          >
            <Avatar className="size-7">
              <AvatarImage
                src={
                  user.profile_image.length > 0
                    ? user.profile_image
                    : "/assets/profile.png"
                }
                alt="User Avatar"
              />
              <AvatarFallback>
                {user.username[0] + user.username[1]}
              </AvatarFallback>
            </Avatar>

            {minimized ? null : (
              <p className="line-clamp-1 font-semibold text-gray-700">
                {user.username}
              </p>
            )}
          </div>
        ) : null}
      </div>

      <Separator />
      <div className="w-full">
        <BottomSideNav minimized={minimized} />
        <ul>
          {bottomMenuItems.map((item) => (
            <li key={item.path + "bottom-side-nav"}>
              <SideNavItem item={{ ...item, minimized }} />
            </li>
          ))}
        </ul>
      </div>

      <Separator />
      <div
        className={cn(
          "font-semibold flex flex-col w-full px-5",
          minimized && "items-center text-center px-0",
        )}
      >
        <p className="text-xs text-primary">{minimized ? "" : "Beta"} V1</p>
        <p className="text-xs text-[#7d7d7d]">
          ©{minimized ? "" : "Copyright "}2024
        </p>
      </div>
    </aside>
  );
}
