import { create } from "zustand";

import { AutoAIActivityIndicatorInterface } from "~/schema/auto-ai";

import { createSelectors } from "../zustand";

interface BaseMessage {
  sender: string;
  message: string;
  img_url: string;
  timestamp: string;
}

interface ReceivedMessage extends BaseMessage {
  type: "received";
}

interface SentMessage extends BaseMessage {
  type: "sent";
}

type Message = ReceivedMessage | SentMessage;

interface AutoAiStoreInterface {
  indicator: AutoAIActivityIndicatorInterface["data"]["info"] | null;
  messages: Message[];
  setIndicator: (
    data: AutoAIActivityIndicatorInterface["data"]["info"],
  ) => void;
  addMessage: (message: Message) => void;
}

const _useAutoAiStore = create<AutoAiStoreInterface>()((set) => ({
  indicator: null,
  messages: [],
  setIndicator: (indicator) => {
    set({ indicator });
  },
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));

export const setAutoAiIndicator: AutoAiStoreInterface["setIndicator"] = (v) =>
  _useAutoAiStore.getState().setIndicator(v);

export const addAutoAiMessage: AutoAiStoreInterface["addMessage"] = (message) =>
  _useAutoAiStore.getState().addMessage(message);

const useAutoAiStore = createSelectors(_useAutoAiStore);
export default useAutoAiStore;
