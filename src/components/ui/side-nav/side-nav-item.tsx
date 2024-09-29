import { Link, useRouterState } from "@tanstack/react-router";
import { LucideProps } from "lucide-react";
import { useCallback } from "react";

import { cn } from "~/lib/utils";

import { Button, buttonVariants } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

interface BaseProps {
  name: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

interface PathProps extends BaseProps {
  path: string;
  action?: () => unknown;
}

interface ActionProps extends BaseProps {
  path?: string;
  action: () => unknown;
}

export type SideNavItemProps = PathProps | ActionProps;

interface Props {
  item: SideNavItemProps & { minimized?: boolean };
}

export default function SideNavItem({ item: { Icon, ...item } }: Props) {
  const router = useRouterState();
  const className = cn(
    "justify-start w-full gap-x-2 px-4 rounded-none focus-visible:ring-none focus-visible:ring-transparent text-[#5B5772] fill-[#5B5772]",
    item.path &&
      router.location.pathname.includes(item.path) &&
      "bg-[#EEEDF1] fill-black stroke-black hover:bg-none text-black hover:text-none",
    item.minimized && "justify-center items-center p-0",
  );

  const trigger = useCallback(() => {
    if (item.path)
      return (
        <Link
          // to={item.path}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: item.minimized ? "icon" : "lg",
            }),
            className,
          )}
        >
          <Icon className="mx-2 size-4" />
          {item.minimized ? null : item.name}
        </Link>
      );

    return (
      <Button
        className={className}
        onClick={item.action}
        variant="ghost"
        size={item.minimized ? "icon" : "lg"}
      >
        <Icon className="mx-2 size-4" />
        {item.minimized ? null : item.name}
      </Button>
    );
  }, [Icon, className, item.action, item.minimized, item.name, item.path]);

  const TriggerType = useCallback(() => {
    if (item.minimized)
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{trigger()}</TooltipTrigger>
            <TooltipContent side="right">{item.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

    return trigger();
  }, [trigger, item]);

  return <TriggerType />;
}
