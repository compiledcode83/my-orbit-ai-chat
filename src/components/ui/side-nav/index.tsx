import { Link } from "@tanstack/react-router";
import { MessageSquareText, PencilRuler, Store } from "lucide-react";

import { cn } from "~/lib/utils";

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
  SidebarSeparator,
  SidebarTrigger,
} from "../sidebar";
import BottomSideNav from "./bottom-side-nav";
import { Profile } from "./profile";

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
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="w-full flex-row items-center group-data-[collapsible=icon]:px-0">
        <Link
          to="/chat/my-orbit"
          className="mr-auto flex shrink-0 items-center group-data-[collapsible=icon]:hidden"
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
        <SidebarGroup className="mb-auto">
          <SidebarGroupContent>
            <SidebarMenu className="">
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

        <Profile />
        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="w-full">
              <BottomSideNav />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
      </SidebarContent>

      <SidebarFooter
        className={cn(
          "flex w-full flex-col px-5 font-semibold group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-0",
        )}
      >
        <p className="text-xs text-primary">
          <span className="group-data-[collapsible=icon]:hidden">Beta</span> V1
        </p>

        <p className="text-xs text-[#7d7d7d]">
          ©
          <span className="group-data-[collapsible=icon]:hidden">
            Copyright{" "}
          </span>
          2024
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
