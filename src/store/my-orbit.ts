import { create } from "zustand";

import {
  MyOrbitActivityIndicatorInterface,
  NewBotMessageInterface,
} from "~/schema/my-orbit";

import { createSelectors } from "./zustand";

interface BaseMessage extends NewBotMessageInterface {
  timestamp?: string;
}

interface ReceivedMessage extends BaseMessage {
  type: "received";
}

interface SentMessage extends BaseMessage {
  type: "sent";
}

type Message = ReceivedMessage | SentMessage;

interface Suggestion {
  message: string;
}

interface MyOrbitStoreInterface {
  messages: Message[];
  indicators: MyOrbitActivityIndicatorInterface[];
  suggestions: Suggestion[];
  addMessage: (message: Message) => void;
  setSuggestions: (suggestions: Suggestion[]) => void;
  setIndicators: (i: MyOrbitActivityIndicatorInterface) => void;
}

const _useMyOrbitStore = create<MyOrbitStoreInterface>()((set, get) => ({
  messages: [],
  suggestions: [],
  indicators: [],
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
  setSuggestions: (suggestions) => {
    set({ suggestions });
  },
  setIndicators: (i) => {
    set({
      indicators: [
        ...get().indicators.filter((indicator) => indicator.id !== i.id),
        i,
      ],
    });
  },
}));

export const addMyOrbitMessage: MyOrbitStoreInterface["addMessage"] = (
  message,
) => _useMyOrbitStore.getState().addMessage(message);

export const setMyOrbitSuggestions = _useMyOrbitStore.getState().setSuggestions;
export const setMyOrbitIndicator = _useMyOrbitStore.getState().setIndicators;

const useMyOrbitStore = createSelectors(_useMyOrbitStore);
export default useMyOrbitStore;
