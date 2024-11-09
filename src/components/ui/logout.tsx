import { LogOut } from "lucide-react";

import { logout } from "~/store/persist-storage/user";

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
} from "./alert-dialog";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";

export default function LogOutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <button>
              <LogOut className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Log Out
              </span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will end your current session and you'll need to login
            again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
