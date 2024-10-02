import useAutoAiStore from "~/store/auto-ai";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "../../chat/chat-bubble";
import { ChatMessageList } from "../../chat/chat-message-list";

export default function AutoAI() {
  const messages = useAutoAiStore.use.messages();

  return (
    <ChatMessageList>
      {messages.map((message, index) => (
        <ChatBubble key={index} variant={message.type}>
          <ChatBubbleAvatar
            src={
              (message.img_url ?? message.type === "received")
                ? "/assets/orbit-mascot.png"
                : "/assets/profile.png"
            }
            fallback="O"
          />
          <ChatBubbleMessage size="xs" variant={message.type}>
            <p>{message.message}</p>
          </ChatBubbleMessage>
        </ChatBubble>
      ))}
    </ChatMessageList>
  );
}
