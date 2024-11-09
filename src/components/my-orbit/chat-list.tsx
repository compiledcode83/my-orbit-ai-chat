import { formatTimeForChat } from "~/lib/utils";
import useMyOrbitStore from "~/store/my-orbit";

import ChatIndicator from "../chat/indicator";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";

export default function MyOrbitChatList() {
  const { messages, indicators } = useMyOrbitStore();

  return (
    <ChatMessageList>
      {messages.map(({ type, sender, img_url, message, timestamp }, index) => (
        <ChatBubble key={index} variant={type}>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-end gap-x-1">
              {type === "received" && (
                <ChatBubbleAvatar
                  src={
                    (img_url ?? type === "received")
                      ? (img_url ?? "/assets/profile.png")
                      : "/assets/profile.png"
                  }
                  fallback={sender[0]}
                />
              )}

              {sender && type === "received" ? (
                <small className="text-sm font-medium">{sender}</small>
              ) : (
                <div />
              )}

              {timestamp && (
                <small className="ml-auto font-medium text-secondary-foreground/50">
                  {formatTimeForChat(new Date(timestamp))}
                </small>
              )}
            </div>

            <ChatBubbleMessage
              sender={sender}
              size="xs"
              variant={index === 0 ? "received" : "sent"}
            >
              {message}
            </ChatBubbleMessage>
          </div>
        </ChatBubble>
      ))}

      <div className="mt-auto space-y-1">
        {indicators
          .filter((i) => i.typing)
          .map((indicator) => (
            <ChatIndicator
              key={indicator.sender + indicator.id + "my-orbit-chat-indicator"}
              {...indicator}
            />
          ))}
      </div>
    </ChatMessageList>
  );
}
