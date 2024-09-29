import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

import { getChatToken } from "~/actions/auth/chat-token";

import { createSelectors } from "../zustand";

interface ChatTokenStoreInterface {
  data: string | null;
  setChatToken: (token: string) => void;
}

const _useChatTokenStore = create<ChatTokenStoreInterface>()(
  persist(
    (set) => ({
      data: null,
      setChatToken: (t) => set({ data: t }),
    }),
    {
      name: "chat-token",
      storage: {
        getItem: async (name) => {
          const str = Cookies.get(name);
          let data: StorageValue<string>;
          console.log(str);

          if (!str) {
            data = {
              state: await getChatToken().then((res) => res.chat_token),
              version: 0,
            };

            Cookies.set("chat-token", JSON.stringify(data), {
              expires: 1,
              secure: import.meta.env.PROD,
            });

            setChatToken(data.state);
          } else data = JSON.parse(str);

          return data;
        },
        setItem: (name, user: StorageValue<string>) => {
          const str = JSON.stringify(user);
          Cookies.set(name, str, { expires: 1, secure: import.meta.env.PROD });
        },
        removeItem: (name) => Cookies.remove(name),
      },
    },
  ),
);

export const setChatToken: ChatTokenStoreInterface["setChatToken"] = (t) =>
  _useChatTokenStore.getState().setChatToken(t);

const useChatTokenState = createSelectors(_useChatTokenStore);

export default useChatTokenState;
