import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";
import { SignInSuccess } from "~/actions/auth/signin.interface";
import Cookies from "js-cookie";
import { getProfile } from "~/actions/auth/user";
import { UserInterface } from "~/schema/user";
import { createSelectors } from "../zustand";

interface UserStoreInterface {
  data: UserInterface | null;
  signIn: (v: SignInSuccess) => void;
  logout: () => void;
}

const _useUserStore = create<UserStoreInterface>()(
  persist(
    (set) => ({
      data: null, // default is no user
      signIn: ({ user_details, access_token }: SignInSuccess) => {
        Cookies.set("token", access_token, { expires: 1 });
        set({ data: user_details });
      },
      logout: () => {
        Cookies.remove("token");
        set({ data: null });
        window.location.reload();
      },
    }),
    {
      name: "user-storage",
      storage: {
        getItem: async (name) => {
          let str = Cookies.get(name);
          let data: StorageValue<UserInterface>;
          if (!str)
            data = {
              state: await getProfile().then((res) => res.data),
              version: 0,
            };
          else data = JSON.parse(str);
          return data;
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
export const logout = () => _useUserStore.getState().logout();

export default useUserStore;
