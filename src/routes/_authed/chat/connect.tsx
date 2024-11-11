/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { MyContacts } from "~/components/connect/my-contacts";
import { MyInteractions } from "~/components/connect/my-interactions";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

export const Route = createFileRoute("/_authed/chat/connect")({
  component: () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px");

    const calculateHeight = () => {
      if (headerRef.current && containerRef.current) {
        const headerHeight = headerRef.current.clientHeight;
        const containerHeight = containerRef.current.clientHeight;
        console.log(containerHeight);
        const calculatedHeight = `calc(${containerHeight}px - ${headerHeight}px)`;
        setScrollAreaHeight(calculatedHeight);
      }
    };

    useEffect(() => {
      const headerObserver = new ResizeObserver(() => calculateHeight());
      const footerObserver = new ResizeObserver(() => calculateHeight());

      if (headerRef.current) headerObserver.observe(headerRef.current);
      if (containerRef.current) footerObserver.observe(containerRef.current);
      calculateHeight();

      return () => {
        if (headerRef.current) headerObserver.unobserve(headerRef.current);
        if (containerRef.current)
          footerObserver.unobserve(containerRef.current);
      };
    }, []);

    return (
      <Card
        className="z-20 size-full rounded-[42px] border-none bg-white shadow-sm"
        ref={containerRef}
      >
        <CardHeader ref={headerRef}>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>

        <CardContent
          style={{ height: scrollAreaHeight }}
          className="overflow-hidden pb-0 pr-0"
        >
          <ScrollArea style={{ height: scrollAreaHeight }} className="px-0">
            <div className="mr-6 flex flex-col gap-y-2">
              <MyInteractions />
              <Separator />
              <MyContacts />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  },
});
