import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useEffect } from "react";

import BottomTabSwitcher from "~/components/bottom-tab-switcher";
import IncomingCall from "~/components/call/incoming-call";
import RightPanelTrigger from "~/components/ui/right-panel";
import { SideNav } from "~/components/ui/side-nav";
import useChatTokenState from "~/store/persist-storage/chat-token";
import { getUser } from "~/store/persist-storage/user";
import { connectWebSocket, disconnectWebSocket } from "~/store/socket";

const AuthedLayout = () => {
  const chatToken = useChatTokenState.use.data();

  useEffect(() => {
    if (chatToken) connectWebSocket(chatToken);
    return () => {
      if (chatToken) disconnectWebSocket();
    };
  }, [chatToken]);

  return (
    <div className="w-dvh flex h-dvh items-start bg-[#F6F6F9] max-md:flex-col md:justify-between">
      <header className="relative flex h-12 w-screen items-center justify-center md:hidden">
        <div className="absolute inset-y-auto left-2">
          {/* TODO: add mobile layout side-nav */}
        </div>

        <Link to="/chat/my-orbit" className="absolute inset-auto">
          <img
            className="h-8"
            src="/assets/logos/my-orbit-logo.svg"
            alt="MyOrbitAi"
          />
        </Link>
      </header>

      <div className="max-md:hidden">
        <SideNav />
      </div>

      <div className="relative flex size-full h-dvh flex-col p-10">
        <IncomingCall />
        <div className="size-full">
          <Outlet />
        </div>
        <BottomTabSwitcher />
      </div>

      <RightPanelTrigger />
    </div>
  );
};

export const Route = createFileRoute("/_authed")({
  beforeLoad: () => {
    const token = Cookies.get("token");
    const user = getUser();
    if (!token || !user)
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
  },
  component: AuthedLayout,
});
