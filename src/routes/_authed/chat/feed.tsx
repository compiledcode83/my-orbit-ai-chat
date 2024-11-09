/* eslint-disable react-hooks/rules-of-hooks */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import Feed from "~/components/feed/feed";
import { ScrollArea } from "~/components/ui/scroll-area";

export const Route = createFileRoute("/_authed/chat/feed")({
  component: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px");

    const calculateHeight = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const calculatedHeight = `calc(${containerHeight}px)`;
        setScrollAreaHeight(calculatedHeight);
      }
    };

    useEffect(() => {
      const footerObserver = new ResizeObserver(() => calculateHeight());

      if (containerRef.current) footerObserver.observe(containerRef.current);
      calculateHeight();

      return () => {
        if (containerRef.current)
          footerObserver.unobserve(containerRef.current);
      };
    }, []);

    return (
      <div
        className="z-50 size-full overflow-hidden rounded-2xl border border-none bg-card bg-white px-4 pt-4 text-card-foreground shadow-md"
        ref={containerRef}
      >
        <ScrollArea style={{ height: scrollAreaHeight }} className="px-0">
          <div>
            <h2 className="text-2xl font-semibold text-[#3F3D4F]">
              Hi, John!👋
            </h2>
            <div className="space-y-3 text-base font-medium text-[#1411519]">
              <p>
                Welcome to your exclusive feed! 🎉 Every piece of content has
                been specially made for you, making it completely unique.
              </p>
              <p>
                No two feeds are alike, because you deserve something tailored,
                fresh, and fun just for you. 😉
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Feed />
            <Feed />
            <Feed />
          </div>
        </ScrollArea>
      </div>
    );
  },
});
