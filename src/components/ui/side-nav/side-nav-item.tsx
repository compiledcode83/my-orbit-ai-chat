import { cn } from "~/lib/utils";
import { buttonVariants, Button } from "../button";
import { Link, useRouterState } from "@tanstack/react-router";
import { LucideProps } from "lucide-react";
import { useCallback } from "react";
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
  action?: () => any;
}

interface ActionProps extends BaseProps {
  path?: string;
  action: () => any;
}

export type SideNavItemProps = PathProps | ActionProps;

interface Props {
  item: SideNavItemProps & { minimized?: boolean };
}

export default function SideNavItem({ item: { Icon, ...item } }: Props) {
  const router = useRouterState();
  const className = cn(
    "justify-start w-full gap-x-4 px-4 rounded-none focus-visible:ring-none focus-visible:ring-transparent text-[#5B5772] fill-[#5B5772]",
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
          <Icon className="size-4 mx-2" />
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
        <Icon className="size-4 mx-2" />
        {item.minimized ? null : item.name}
      </Button>
    );
  }, [item]);

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
