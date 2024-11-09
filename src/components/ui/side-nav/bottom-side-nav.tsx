import { Link } from "@tanstack/react-router";
import { BriefcaseBusiness, FileText, Settings } from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../menubar";
import { SidebarMenuButton, SidebarMenuItem } from "../sidebar";

const bottomMenuItems = [
  {
    name: "Settings",
    Icon: Settings,
    items: [
      { name: "MyOrbit Experience", path: "/setting/orbit-experience" },
      { name: "Account Settings", path: "/setting/account-details" },
    ],
  },

  {
    name: "Policy",
    Icon: FileText,
    items: [
      { name: "FAQ", path: "/setting/orbit-experience" },
      { name: "Help & Support", path: "/help-and-support" },
      { name: "Safety & Privary", path: "/legal/safety" },
      { name: "Privacy Policy", path: "/legal/privacy-policy" },
      { name: "Terms of Service", path: "/legal/terms-of-service" },
      { name: "Acceptable Use Policy", path: "/legal/acceptable-use-policy" },
      {
        name: "Creative ML Open Rail M License",
        path: "/legal/creative-ml-open-rail-m-license",
      },
    ],
  },

  {
    name: "Careers",
    Icon: BriefcaseBusiness,
    items: [
      { name: "Join Us", path: "/join-us" },
      { name: "Prise", path: "/prise" },
      { name: "Sphere", path: "/sphere" },
      { name: "Compensation", path: "/compensation" },
    ],
  },
];

export default function BottomSideNav() {
  return (
    <Menubar className="flex h-auto w-full flex-col gap-y-1 space-x-0 border-none p-0">
      {bottomMenuItems.map(({ name, Icon, items }) => (
        <MenubarMenu>
          <MenubarTrigger asChild className="rounded-none border-none p-0">
            <SidebarMenuItem className="w-full">
              <SidebarMenuButton className="justify-start font-normal">
                <Icon className="size-4" />
                {name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </MenubarTrigger>

          <MenubarContent side="right">
            {items.map((item) => (
              <MenubarItem
                asChild
                key={item.name + item.path + "side-menu-bottom"}
              >
                <Link className="cursor-pointer hover:underline" to={item.path}>
                  {item.name}
                </Link>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
