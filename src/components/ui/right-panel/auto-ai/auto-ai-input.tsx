import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { useState } from "react";

import useAutoAiStore, { addAutoAiMessage } from "~/store/auto-ai";
import useUserStore from "~/store/persist-storage/user";
import useWebSocketStore, { emitWSMessage } from "~/store/socket";

import { Button } from "../../button";
import { ChatInput } from "../../chat/chat-input";

export default function AutoAIInput() {
  const indicator = useAutoAiStore.use.indicator();
  const connected = useWebSocketStore.use.connected();
  const profile = useUserStore.use.data();
  const [txt, setTxt] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const message = formData.get("message")?.toString().trim();
    if (!message || message === "") return;
    emitWSMessage({ action: "auto_ai", data: { prompt: message } });
    addAutoAiMessage({
      type: "sent",
      message,
      img_url: profile?.profile_image ?? "/assets/profile.png",
      sender: profile?.username ?? "Me",
      timestamp: new Date().toISOString(),
    });
    setTxt("");
  };

  if (!profile || !connected) return;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
    >
      <ChatInput
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
        name="message"
        placeholder="Ask anything..."
        className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-transparent"
      />

      <div className="flex items-center pt-0">
        <Button type="button" disabled variant="ghost" size="icon">
          <Paperclip className="size-4 scale-[80%]" />
          <span className="sr-only">Attach file</span>
        </Button>

        <Button type="button" disabled variant="ghost" size="icon">
          <Mic className="size-4 scale-[80%]" />
          <span className="sr-only">Use Microphone</span>
        </Button>

        <Button
          disabled={indicator === "deactivate_send_button"}
          size="sm"
          type="submit"
          className="ml-auto scale-[80%] gap-1.5"
        >
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
