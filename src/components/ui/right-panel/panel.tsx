/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import useRightPanelStore from "~/store/persist-storage/right-panel-state";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { ScrollArea } from "../scroll-area";
import { Separator } from "../separator";
import RecommendedAvatars from "./recommended-avatars";
import YourAvatarPanel from "./your-avatars";

export default function RightPanel() {
  const selectedPanel = useRightPanelStore.use.data();

  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [scrollAreaHeight, setScrollAreaHeight] = useState<string>("0px");

  const calculateHeight = () => {
    if (headerRef.current && footerRef.current) {
      const headerHeight = headerRef.current.clientHeight;
      const footerHeight = footerRef.current.clientHeight;
      const calculatedHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
      setScrollAreaHeight(calculatedHeight);
    }
  };

  useEffect(() => {
    const headerObserver = new ResizeObserver(() => calculateHeight());
    const footerObserver = new ResizeObserver(() => calculateHeight());

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (footerRef.current) footerObserver.observe(footerRef.current);
    calculateHeight();

    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current);
      if (footerRef.current) footerObserver.unobserve(footerRef.current);
    };
  }, []);

  if (!selectedPanel) {
    return null;
  }

  return (
    <div className="z-10 ml-auto h-screen w-full max-w-[90vw] overflow-hidden bg-white p-0 shadow-md md:max-w-sm">
      {selectedPanel === "your-avatar" ? (
        <Card className="border-none shadow-none">
          <CardHeader ref={headerRef} className="border-b">
            <CardTitle>Your Avatars</CardTitle>
            <CardDescription>
              Avatars in My Orbit will speak with you automatically
            </CardDescription>
          </CardHeader>

          <CardContent className="flex h-full flex-col p-0">
            <ScrollArea style={{ height: scrollAreaHeight }} className="px-0">
              <div className="flex flex-col gap-y-2 pb-0 pt-4">
                <small className="mx-4 mt-0 text-center font-medium text-primary">
                  Click & Activate Avatars
                </small>

                <div className="divide-y divide-dashed">
                  <YourAvatarPanel />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col gap-y-2">
                <small className="mx-6 mt-0 text-center font-medium text-primary">
                  Avatars Recommended For You
                </small>

                <div className="divide-y divide-dashed">
                  <RecommendedAvatars />
                </div>
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter
            ref={footerRef}
            className="flex w-full flex-col gap-y-4 border-t pt-6"
          >
            <Button className="w-full">Get Avatars</Button>
            <Button className="w-full" variant="outline">
              Create Avatars
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </div>
  );
}
