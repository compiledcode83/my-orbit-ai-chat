import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import useWebSocketStore from "~/store/socket";

const BotCall = () => {
  const botId = Number(Route.useParams().botId);
  const { connect, socket } = useWebSocketStore();

  const [isPending, setIsPending] = useState(true);

  console.log(botId);
  console.log(isPending);

  //   useEffect(() => {
  //     socket.emit('', {
  //     "action" : "start_avatar_call",
  //     "data" : {
  //         "avatar_id" : 2
  //     }
  // })
  //   }, [botId])

  useEffect(() => {
    const handleWebSocketMessage = (event: MessageEvent) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        const { action, data } = parsedMessage;

        if (action === "avatar_call") {
          if (data.message === "Avatar call initialized") setIsPending(false);
          if (
            data.type === "error" &&
            window.location.pathname.includes("/bot-call")
          )
            throw notFound();
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    if (socket) {
      socket.addEventListener("message", handleWebSocketMessage);
      socket.addEventListener("error", () => {
        throw notFound();
      });
    }

    return () => {
      if (socket) {
        socket.removeEventListener("message", handleWebSocketMessage);
        socket.removeEventListener("error", () => {});
      }
    };
  }, [socket, connect]);

  return (
    <>
      <h2>Bot Call</h2>
    </>
  );
};

export const Route = createFileRoute("/_authed/chat/bot-call/$botId")({
  component: BotCall,
});
