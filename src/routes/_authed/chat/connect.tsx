import { createFileRoute } from "@tanstack/react-router";

import { MyContacts } from "~/components/connect/my-contacts";
import { MyInteractions } from "~/components/connect/my-interactions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export const Route = createFileRoute("/_authed/chat/connect")({
  component: () => (
    <Card className="size-full border-none bg-white">
      <CardHeader>
        <CardTitle>Conversations</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-2">
        <MyInteractions />
        <Separator />
        <MyContacts />
      </CardContent>
    </Card>
  ),
});
