import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../menubar";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../button";
import { BriefcaseBusiness, FileText, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

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
    <Menubar className="flex flex-col space-x-0 w-full border-none p-0 h-auto">
      {bottomMenuItems.map(({ name, Icon, items }) => (
        <MenubarMenu>
          <MenubarTrigger asChild className="border-none rounded-none">
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "justify-start w-full gap-x-4 px-4 rounded-none focus-visible:ring-none focus-visible:ring-transparent text-[#5B5772] fill-[#5B5772]",
              )}
            >
              <Icon className="size-4 mx-2" />
              {name}
            </div>
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
