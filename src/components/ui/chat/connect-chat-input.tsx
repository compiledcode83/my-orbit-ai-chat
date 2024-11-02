import { Mic, SendHorizonal } from "lucide-react";
import React, { useState } from "react";

import { cn } from "~/lib/utils";

import { Textarea } from "../textarea";

interface ConnectChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSend?: (message: string) => void;
}

export const ConnectChatInput = React.forwardRef<
  HTMLTextAreaElement,
  ConnectChatInputProps
>(({ className, onSend, ...props }, ref) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message) return;
    if (onSend) onSend(message);
    setMessage("");
  };

  return (
    <div className="flex min-h-16 w-full resize-none items-end rounded-[32px] border border-primary/20 bg-background p-1">
      <button className="flex rounded-full">
        <Mic className="m-[18px] size-5 text-green-700" />
      </button>

      <Textarea
        autoComplete="off"
        ref={ref}
        name="message"
        onChange={(e) => setMessage(e.target.value)}
        className={cn(
          "my-auto flex min-h-14 w-full resize-none items-center rounded-none border-0 pl-0 text-sm ring-0 placeholder:font-light placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />

      <button onClick={handleSend} className="flex rounded-full bg-primary/10">
        <SendHorizonal className="m-[18px] size-5 text-primary" />
      </button>
    </div>
  );
});
