import { create } from "zustand";

import { InteractionContactInterface } from "~/schema/user";

import { createSelectors } from "../zustand";

export interface InteractionContactsStateInterface {
  data: Array<InteractionContactInterface> | null;
  setInteractions: (v: InteractionContactsStateInterface["data"]) => void;
}

const _useInteractionContactsStore = create<InteractionContactsStateInterface>(
  (set) => ({
    data: null,
    setInteractions: (state) => set({ data: state }),
  }),
);

export const setInteractions: InteractionContactsStateInterface["setInteractions"] =
  (v) => _useInteractionContactsStore.getState().setInteractions(v);

const useInteractionContactsStore = createSelectors(
  _useInteractionContactsStore,
);
export default useInteractionContactsStore;
