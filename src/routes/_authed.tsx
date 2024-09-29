import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";
import SideNav from "~/components/ui/side-nav";

export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    const token = Cookies.get("token");
    if (!token)
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
  },
  component: () => {
    return (
      <div className="flex bg-[#F6F6F9] items-start w-screen">
        <SideNav />
        <Outlet />
      </div>
    );
  },
});
