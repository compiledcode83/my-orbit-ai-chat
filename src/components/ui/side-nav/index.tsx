import { Link } from "@tanstack/react-router";
import { LogOut, MessageSquareText, PencilRuler, Store } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import useUserStore, { logout } from "~/store/persist-storage/user";
import { Separator } from "../separator";
import SideNavItem, { SideNavItemProps } from "./side-nav-item";
import BottomSideNav from "./bottom-side-nav";

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
  const user = useUserStore.use.data();

  return (
    <aside className="w-[248px] flex flex-col items-start h-screen bg-white pt-3 pb-6 gap-y-4">
      <div className="flex items-center justify-between">
        <Link
          to="/chat/my-orbit"
          className="main-logo flex shrink-0 ml-4 items-center"
        >
          <img
            className="left-5 top-5 h-9"
            src="/assets/logos/my-orbit-logo.svg"
            alt="MyOrbitAi"
          />
        </Link>
      </div>

      <div className="flex flex-1 justify-between w-full mt-4 flex-col gap-y-6">
        {/* Menu Items */}
        <ul>
          {menuItems.map((item) => (
            <li key={item.path + "side-nav"}>
              <SideNavItem item={item} />
            </li>
          ))}
        </ul>

        {/* User Info */}
        {user ? (
          <div className="px-5 flex justify-start items-center mt-auto space-x-3">
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

            <p className="line-clamp-1 font-semibold text-gray-700">
              {user.username}
            </p>
          </div>
        ) : null}
      </div>

      <Separator />
      <div className="w-full">
        <BottomSideNav />
        <ul>
          {bottomMenuItems.map((item) => (
            <li key={item.path + "bottom-side-nav"}>
              <SideNavItem item={item} />
            </li>
          ))}
        </ul>
      </div>

      <Separator />
      <div className="mx-5">
        <p className="text-xs font-semibold text-primary">Beta V1</p>
        <p className="text-xs font-semibold text-[#7d7d7d]">©Copyright 2024</p>
      </div>
    </aside>
  );
}
