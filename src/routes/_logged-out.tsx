import { createFileRoute, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/_logged-out")({
  beforeLoad: () => {
    const token = Cookies.get("token");
    if (token) throw redirect({ to: "/chat/my-orbit" });
  },
});
