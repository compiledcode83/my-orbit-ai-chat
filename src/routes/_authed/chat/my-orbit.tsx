import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/chat/my-orbit")({
  component: () => <div>Hello /_authed/chat/my-orbit!</div>,
});
