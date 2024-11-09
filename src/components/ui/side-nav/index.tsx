import { Link } from "@tanstack/react-router";
import { MessageSquareText, PencilRuler, Store } from "lucide-react";

import { cn } from "~/lib/utils";
import useUserStore from "~/store/persist-storage/user";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import LogOutButton from "../logout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "../sidebar";
import BottomSideNav from "./bottom-side-nav";

const menuItems = [
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

export function SideNav() {
  const user = useUserStore.use.data();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-white">
        <SidebarHeader className="w-full flex-row items-center group-data-[collapsible=icon]:px-0">
          <Link
            to="/chat/my-orbit"
            className="main-logo mr-auto flex shrink-0 items-center group-data-[collapsible=icon]:hidden"
          >
            <img
              className="left-5 top-5 h-9"
              src="/assets/logos/my-orbit-logo.svg"
              alt="MyOrbitAi"
            />
          </Link>
          <SidebarTrigger className="group-data-[collapsible=icon]:mx-auto" />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {/* Menu Items */}
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path}>
                        <item.Icon />
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Info */}
          {user ? (
            <div
              className={cn(
                "mt-auto flex items-center justify-start gap-x-3 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
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

              <p className="line-clamp-1 font-semibold text-gray-700 group-data-[collapsible=icon]:hidden">
                {user.username}
              </p>
            </div>
          ) : null}
          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="w-full">
                <BottomSideNav />
                <LogOutButton />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* <div className="w-full"> */}
          {/* <BottomSideNav /> */}
          {/* </div> */}

          <SidebarSeparator />
        </SidebarContent>

        <SidebarFooter
          className={cn(
            "flex w-full flex-col px-5 font-semibold",
            "group-data-[collapsible=icon]:hidden",
          )}
        >
          <p className="text-xs text-primary">Beta V1</p>
          <p className="text-xs text-[#7d7d7d]">©Copyright 2024</p>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
