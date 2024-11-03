/* eslint-disable react-hooks/rules-of-hooks */

import { createFileRoute } from "@tanstack/react-router";
import { CircleCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

import AccountSetting from "~/components/settings/account-setting";
import PermissionSetting from "~/components/settings/permission-setting";
import ProfileSetting from "~/components/settings/profile-setting";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const REMOVE_AUTOSAVED_MSG_AFTER = 5000;

export const Route = createFileRoute("/_authed/setting/account-details")({
  component: () => {
    const [autosaved, setAutosaved] = useState<boolean>(false);

    useEffect(() => {
      if (autosaved) {
        const timer = setTimeout(
          () => setAutosaved(false),
          REMOVE_AUTOSAVED_MSG_AFTER,
        );

        return () => clearTimeout(timer);
      }
    }, [autosaved]);

    return (
      <>
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-6">
            <h3 className="items-center text-4xl font-semibold tracking-tight">
              Account Settings
            </h3>
            {autosaved && (
              <div className="flex items-center gap-1">
                <CircleCheck className="size-5 text-green-400" />
                <p className="flex items-center text-sm text-green-400">
                  Changes have been auto-saved
                </p>
              </div>
            )}
          </div>
          <Button className="flex gap-2 p-0" variant="link">
            <UserPlus className="size-5" />
            <p className="text-sm">Invite A Friend</p>
          </Button>
        </div>
        <Separator className="my-2" />
        <div className="mt-8 flex items-center justify-between">
          <p className="text-2xl font-semibold">Profile</p>
          <Button variant="outline" className="border-primary text-primary">
            My Connect Card
          </Button>
        </div>
        <Separator className="my-2" />
        <ProfileSetting setAutosaved={setAutosaved} />

        <p className="mt-8 text-2xl font-semibold">Account</p>
        <Separator className="my-2" />
        <AccountSetting setAutosaved={setAutosaved} />

        <p className="mt-8 text-2xl font-semibold">Permissions</p>
        <Separator className="mb-6 mt-2" />
        <PermissionSetting />
      </>
    );
  },
});
