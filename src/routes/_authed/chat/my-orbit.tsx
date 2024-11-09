/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import MyOrbitChatList from "~/components/my-orbit/chat-list";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { ConnectChatInput } from "~/components/ui/chat/connect-chat-input";
import { addMyOrbitMessage } from "~/store/my-orbit";
import useUserStore from "~/store/persist-storage/user";
import { emitWSMessage } from "~/store/socket";

export const Route = createFileRoute("/_authed/chat/my-orbit")({
  component: () => {
    const profile = useUserStore.use.data();

    const containerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px");

    const calculateHeight = () => {
      if (footerRef.current && containerRef.current) {
        const footerHeight = footerRef.current.clientHeight;
        const containerHeight = containerRef.current.clientHeight;
        const calculatedHeight = `calc(${containerHeight}px - ${footerHeight}px)`;
        setScrollAreaHeight(calculatedHeight);
      }
    };

    const onSend = (message: string) => {
      emitWSMessage({ action: "send_user_message", data: { message } });
      addMyOrbitMessage({
        type: "sent",
        message,
        img_url: profile?.profile_image ?? "/assets/profile.png",
        sender: profile?.username ?? "Me",
        verified: false,
        timestamp: new Date().toISOString(),
      });
    };

    useEffect(() => {
      const containerObserver = new ResizeObserver(() => calculateHeight());
      const footerObserver = new ResizeObserver(() => calculateHeight());

      if (containerRef.current) containerObserver.observe(containerRef.current);
      if (footerRef.current) footerObserver.observe(footerRef.current);
      calculateHeight();

      return () => {
        if (footerRef.current) footerObserver.unobserve(footerRef.current);
        if (containerRef.current)
          footerObserver.unobserve(containerRef.current);
      };
    }, []);

    return (
      <Card
        className="z-20 size-full resize-none rounded-[42px] border-none bg-white shadow-sm"
        ref={containerRef}
      >
        <CardContent
          style={{ height: scrollAreaHeight }}
          className="flex flex-col overflow-hidden px-2 pb-0"
        >
          <MyOrbitChatList />
        </CardContent>

        <CardFooter ref={footerRef}>
          <ConnectChatInput
            onSend={onSend}
            placeholder="Ask your Orbit anything. Enjoy!"
          />
        </CardFooter>
      </Card>
    );
  },
});
