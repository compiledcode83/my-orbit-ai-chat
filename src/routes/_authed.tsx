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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
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
    <>
      <SidebarProvider>
        <SideNav />

        <SidebarInset>
          <header className="relative flex h-12 w-screen items-center justify-center md:hidden">
            <SidebarTrigger className="absolute left-2" />

            <Link to="/chat/my-orbit" className="absolute inset-auto">
              <img
                className="h-8"
                src="/assets/logos/my-orbit-logo.svg"
                alt="MyOrbitAi"
              />
            </Link>
          </header>

          <div className="relative flex size-full h-dvh flex-col bg-[#F6F6F9] p-10">
            <IncomingCall />
            <Outlet />
            <BottomTabSwitcher />
          </div>
        </SidebarInset>

        <RightPanelTrigger />
      </SidebarProvider>
    </>
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
