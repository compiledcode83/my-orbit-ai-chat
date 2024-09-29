import { Link } from "@tanstack/react-router";
import {
  LogOut,
  MenuIcon,
  MessageSquareText,
  PencilRuler,
  Store,
} from "lucide-react";
import { useState } from "react";

import { cn } from "~/lib/utils";
import useUserStore, { logout } from "~/store/persist-storage/user";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Separator } from "../separator";
import BottomSideNav from "./bottom-side-nav";
import SideNavItem, { SideNavItemProps } from "./side-nav-item";

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
        "flex h-screen flex-col items-start gap-y-4 bg-white py-4 shadow-md",
        minimized ? "w-14" : "w-[248px]",
      )}
    >
      <div className="flex w-full items-center justify-between px-4">
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

      <div className="mt-4 flex w-full flex-1 flex-col justify-between gap-y-6">
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
              "mt-auto flex items-center justify-start gap-x-3 px-5",
              minimized && "items-center justify-center px-0",
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
          "flex w-full flex-col px-5 font-semibold",
          minimized && "items-center px-0 text-center",
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
