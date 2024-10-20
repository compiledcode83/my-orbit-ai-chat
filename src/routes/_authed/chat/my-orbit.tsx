import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const Route = createFileRoute("/_authed/chat/my-orbit")({
  component: () => (
    <Card className="z-20 size-full rounded-2xl border-none bg-white shadow-md">
      <CardHeader>
        <CardTitle>My Orbit</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden pb-0 pr-0"></CardContent>
    </Card>
  ),
});
