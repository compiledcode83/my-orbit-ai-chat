import useRightPanelStore from "~/store/persist-storage/right-panel-state";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import YourAvatarPanel from "./your-avatar";

export default function RightPanel() {
  const selectedPanel = useRightPanelStore.use.data();

  if (!selectedPanel) {
    return null;
  }

  return (
    <div className="z-10 ml-auto h-screen w-full max-w-[90vw] bg-white shadow-md md:max-w-md">
      {selectedPanel === "your-avatar" ? (
        <Card className="border-none shadow-none">
          <CardHeader className="border-b">
            <CardTitle>Your Avatars</CardTitle>
            <CardDescription>
              Avatars in My Orbit will speak with you automatically
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col px-4">
            <small className="m-2 mt-4 text-center font-medium text-primary">
              Click & Activate Avatars
            </small>
            <YourAvatarPanel />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
