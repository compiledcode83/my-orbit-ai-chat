import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

import { SignInSuccess } from "~/actions/auth/signin.interface";
import { getProfile } from "~/actions/auth/user";
import { UserInterface } from "~/schema/user";

import { createSelectors } from "../zustand";

interface UserStoreInterface {
  data: UserInterface | null;
  signIn: (v: SignInSuccess) => void;
  logout: () => void;
  setData: (data: UserInterface) => void;
}

const _useUserStore = create<UserStoreInterface>()(
  persist(
    (set) => ({
      data: null, // default is no user
      signIn: ({ user_details, access_token }: SignInSuccess) => {
        Cookies.set("token", access_token, { expires: 1 });
        set({ data: user_details });
      },
      setData: (data: UserInterface) => set({ data }),
      logout: () => {
        Cookies.remove("token");
        Cookies.remove("chat-token");
        Cookies.remove("user-storage");
        set({ data: null });
        window.location.reload();
      },
    }),
    {
      name: "user-storage",
      storage: {
        getItem: async (name) => {
          try {
            const str = Cookies.get(name);
            let data: StorageValue<UserInterface>;
            if (!str) {
              data = {
                state: await getProfile().then((res) => res.data),
                version: 0,
              };
              setData(data.state);
            } else data = JSON.parse(str);
            return data;
          } catch {
            logout();
            return null;
          }
        },
        setItem: (name, user: StorageValue<UserInterface>) => {
          const str = JSON.stringify(user);
          Cookies.set(name, str);
        },
        removeItem: (name) => Cookies.remove(name),
      },
    },
  ),
);

const useUserStore = createSelectors(_useUserStore);

export const signIn = (v: SignInSuccess) => _useUserStore.getState().signIn(v);
export const setData = (data: UserInterface) =>
  _useUserStore.getState().setData(data);
export const logout = () => _useUserStore.getState().logout();

export default useUserStore;
