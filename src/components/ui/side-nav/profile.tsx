import { Link } from "@tanstack/react-router";
import { ChevronRight, LogOut, Settings } from "lucide-react";

import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";
import useUserStore, { logout } from "~/store/persist-storage/user";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { SidebarGroup, SidebarMenu } from "../sidebar";

export function Profile() {
  const user = useUserStore.use.data();
  const isMobile = useIsMobile();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <AlertDialog>
          <DropdownMenu modal>
            <DropdownMenuTrigger>
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

                  <ChevronRight className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </div>
              ) : null}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isMobile ? "bottom" : "right"}
              align={isMobile ? "end" : "start"}
              className="min-w-56 rounded-lg"
            >
              <DropdownMenuLabel asChild>
                <div>
                  <h6 className="font-inter text-[10px] uppercase tracking-wider text-[#5B5772]">
                    your plan
                  </h6>

                  <div className="flex w-full items-center justify-between">
                    <p className="text-lg text-[#141519]">Base</p>
                    <Link to="/" className="text-xs capitalize text-[#E75A0F]">
                      Change plan
                    </Link>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to="/setting/account-details">
                    <Settings />
                    Account Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    <LogOut className="size-4" />
                    Log Out
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action will end your current session and you'll need to
                login again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenu>
    </SidebarGroup>
  );
}
