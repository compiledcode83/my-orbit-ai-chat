import * as React from "react";

import { cn } from "~/lib/utils";

import { Textarea } from "../textarea";

type ChatInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, ...props }, ref) => (
    <Textarea
      autoComplete="off"
      ref={ref}
      name="message"
      className={cn(
        "flex h-16 max-h-12 w-full resize-none items-center rounded-md bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
