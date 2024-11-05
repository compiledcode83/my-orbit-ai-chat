import * as React from "react";

import { cn } from "~/lib/utils";

type ChatMessageListProps = React.HTMLAttributes<HTMLDivElement>;

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, children, ...props }, ref) => {
    const internalRef = React.useRef<HTMLDivElement>(null);
    const scrollRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    React.useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [children, scrollRef]);

    return (
      <div
        className={cn(
          "flex h-full w-full flex-col gap-6 overflow-y-auto p-4",
          className,
        )}
        ref={scrollRef}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };
