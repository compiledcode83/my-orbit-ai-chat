import { create } from "zustand";

import { TProfileSchema } from "~/schema/settings";

import { createSelectors } from "../zustand";

export interface UserDetailsInterface {
  data: TProfileSchema | null;
  setUserDetails: (data: UserDetailsInterface["data"]) => void;
}

const _useUserDetailsStore = create<UserDetailsInterface>((set) => ({
  data: null,
  setUserDetails: (state) => set({ data: state }),
}));

export const setUserDetails: UserDetailsInterface["setUserDetails"] = (data) =>
  _useUserDetailsStore.getState().setUserDetails(data);

const useUserDetailsStore = createSelectors(_useUserDetailsStore);
export default useUserDetailsStore;
