import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { useEffect } from "react";

import RightPanelTrigger from "~/components/ui/right-panel";
import SideNav from "~/components/ui/side-nav";
import useChatTokenState from "~/store/persist-storage/chat-token";
import { connectWebSocket, disconnectWebSocket } from "~/store/socket";

const AuthedLayout = () => {
  const chatToken = useChatTokenState.use.data();

  useEffect(() => {
    if (chatToken) connectWebSocket(chatToken);
    return () => {
      console.log("chatToken", "disconnectWebSocket");
      if (chatToken) disconnectWebSocket();
    };
  }, [chatToken]);

  return (
    <div className="w-dvh flex h-dvh items-start justify-between overflow-hidden bg-[#F6F6F9]">
      <SideNav />
      <Outlet />
      <RightPanelTrigger />
    </div>
  );
};

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
  component: AuthedLayout,
});
