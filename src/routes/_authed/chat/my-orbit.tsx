/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ConnectChatInput } from "~/components/ui/chat/connect-chat-input";
import { ScrollArea } from "~/components/ui/scroll-area";

export const Route = createFileRoute("/_authed/chat/my-orbit")({
  component: () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px");

    const calculateHeight = () => {
      if (footerRef.current && headerRef.current && containerRef.current) {
        const headerHeight = headerRef.current.clientHeight;
        const footerHeight = footerRef.current.clientHeight;
        const containerHeight = containerRef.current.clientHeight;
        console.log(containerHeight);
        const calculatedHeight = `calc(${containerHeight}px - ${headerHeight}px - ${footerHeight}px)`;
        setScrollAreaHeight(calculatedHeight);
      }
    };

    useEffect(() => {
      const headerObserver = new ResizeObserver(() => calculateHeight());
      const containerObserver = new ResizeObserver(() => calculateHeight());
      const footerObserver = new ResizeObserver(() => calculateHeight());

      if (headerRef.current) headerObserver.observe(headerRef.current);
      if (containerRef.current) containerObserver.observe(containerRef.current);
      if (footerRef.current) footerObserver.observe(footerRef.current);
      calculateHeight();

      return () => {
        if (headerRef.current) headerObserver.unobserve(headerRef.current);
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
        <CardHeader ref={headerRef}>
          <CardTitle>My Orbit</CardTitle>
        </CardHeader>

        <CardContent
          style={{ height: scrollAreaHeight }}
          className="overflow-hidden pb-0 pr-0"
        >
          <ScrollArea
            style={{ height: scrollAreaHeight }}
            className="px-0"
          ></ScrollArea>
        </CardContent>

        <CardFooter ref={footerRef}>
          <ConnectChatInput placeholder="Ask your Orbit anything. Enjoy!" />
        </CardFooter>
      </Card>
    );
  },
});
