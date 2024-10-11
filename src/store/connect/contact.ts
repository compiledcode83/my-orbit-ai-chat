import { create } from "zustand";

import { ContactInterface } from "~/schema/user";

import { createSelectors } from "../zustand";

export interface ContactStateInterface {
  data: Array<ContactInterface> | null;
  setContacts: (v: ContactStateInterface["data"]) => void;
}

const _useContactStore = create<ContactStateInterface>((set) => ({
  data: null,
  setContacts: (state) => set({ data: state }),
}));

export const setContacts: ContactStateInterface["setContacts"] = (v) =>
  _useContactStore.getState().setContacts(v);

const useContactStore = createSelectors(_useContactStore);
export default useContactStore;
