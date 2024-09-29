import { cn } from "~/lib/utils";
import { buttonVariants, Button } from "../button";
import { Link, useRouterState } from "@tanstack/react-router";
import { LucideProps } from "lucide-react";

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
  item: SideNavItemProps;
}

export default function SideNavItem({ item: { Icon, ...item } }: Props) {
  const router = useRouterState();
  const className = cn(
    "justify-start w-full gap-x-4 px-4 rounded-none focus-visible:ring-none focus-visible:ring-transparent text-[#5B5772] fill-[#5B5772]",
    item.path &&
      router.location.pathname.includes(item.path) &&
      "bg-[#EEEDF1] fill-black stroke-black hover:bg-none text-black hover:text-none",
  );

  if (item.path)
    return (
      <Link
        // to={item.path}
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          className,
        )}
      >
        <Icon className="size-4 mx-2" />
        {item.name}
      </Link>
    );

  return (
    <Button
      className={className}
      onClick={item.action}
      variant="ghost"
      size="lg"
    >
      <Icon className="size-4 mx-2" />
      {item.name}
    </Button>
  );
}
