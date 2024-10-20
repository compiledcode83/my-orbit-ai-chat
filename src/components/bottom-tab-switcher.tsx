import { Link, useLocation } from "@tanstack/react-router";
import { useMemo } from "react";

import { cn } from "~/lib/utils";

export default function BottomTabSwitcher() {
  const { pathname } = useLocation();

  const links = useMemo(() => {
    return [
      {
        title: "My Orbit",
        path: "/chat/my-orbit",
        isActive: pathname === "/chat/my-orbit",
      },
      {
        title: "Connect",
        path: "/chat/connect",
        isActive: pathname === "/chat/connect",
      },
      {
        title: "Feed",
        path: "/chat/feed",
        isActive: pathname === "/chat/feed",
      },
    ];
  }, [pathname]);

  return (
    <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-around gap-x-3 px-4">
      {links.map(({ title, path, isActive }) => (
        <Link
          key={path}
          to={path}
          className={cn(
            "flex h-full w-10 flex-1 items-center justify-center rounded-b-md",
            isActive
              ? "z-20 bg-white text-primary shadow-md"
              : "z-10 border border-t-0 border-[#8E8BA5] bg-[#D8D7E0]",
          )}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}
