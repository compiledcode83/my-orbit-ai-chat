import { create } from "zustand";

import { addAutoAiMessage, setAutoAiIndicator } from "./auto-ai";
import { createSelectors } from "./zustand";

export interface WebSocketStateInterface {
  socket: WebSocket | null;
  connected: boolean;
  connecting: boolean;
  error: string | null;
  connect: (token: string) => void;
  disconnect: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit: (content: { action: string; data: any }) => void;
  setError: (error: string | null) => void;
}

const _useWebSocketStore = create<WebSocketStateInterface>()((set, get) => ({
  socket: null,
  connected: false,
  connecting: false,
  error: null,

  connect: (token: string) => {
    if (get().socket?.readyState === WebSocket.OPEN) {
      console.log("WebSocket is already connected");
      return;
    }

    set({ connecting: true, error: null });
    const socket = new WebSocket(
      import.meta.env.VITE_SOCKET_SERVER_URL + token,
    );

    socket.onopen = () => {
      set({ socket, connected: true, connecting: false });
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);

        const { action, data } = parsedMessage;

        switch (action) {
          case "auto_ai_activity_indicator":
            setAutoAiIndicator(data.info);
            break;

          case "auto_ai_response":
            addAutoAiMessage({
              ...data,
              img_url: data.img_url ?? "/assets/orbit-mascot.png",
              type: "received",
              timestamp: new Date().toISOString(),
            });
            break;

          default:
            console.log("Unknown action received:", action);
            break;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        setWebSocketError("Error parsing WebSocket message");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      set({ error: "WebSocket error occurred" });
    };

    socket.onclose = () => {
      set({ connected: false, connecting: false });
      console.log("WebSocket connection closed");
    };

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, connected: false, connecting: false });
      console.log("WebSocket connection closed");
    }
  },

  emit: (content) => {
    const { socket, connected } = get();
    if (socket && connected) {
      socket.send(JSON.stringify(content));
      console.log("Message sent:", content);
    } else {
      console.error("WebSocket is not connected.");
      set({ error: "WebSocket is not connected" });
    }
  },

  setError: (error: string | null) => set({ error }),
}));

export const useWebSocketStore = createSelectors(_useWebSocketStore);

export const connectWebSocket: WebSocketStateInterface["connect"] = (token) =>
  _useWebSocketStore.getState().connect(token);

export const disconnectWebSocket: WebSocketStateInterface["disconnect"] = () =>
  _useWebSocketStore.getState().disconnect();

export const emitWSMessage: WebSocketStateInterface["emit"] = (content) =>
  _useWebSocketStore.getState().emit(content);

export const setWebSocketError: WebSocketStateInterface["setError"] = (error) =>
  _useWebSocketStore.getState().setError(error);

export default useWebSocketStore;
