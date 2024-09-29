import { LogOut } from "lucide-react";

import { cn } from "~/lib/utils";
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
import { Button } from "./button";

export default function LogOutButton({ minimized }: { minimized?: boolean }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            "focus-visible:ring-none w-full justify-start gap-x-2 rounded-none fill-[#5B5772] px-4 text-[#5B5772] focus-visible:ring-transparent",
            minimized && "items-center justify-center p-0",
          )}
          variant="ghost"
          size={minimized ? "icon" : "lg"}
        >
          <LogOut className="mx-2 size-4" />
          {minimized ? null : "Log Out"}
        </Button>
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
