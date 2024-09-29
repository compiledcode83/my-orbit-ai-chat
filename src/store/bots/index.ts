import { create } from "zustand";

import { BotInterface } from "~/schema/bot";

import { createSelectors } from "../zustand";

export interface enabledBotsStateInterface {
  data: BotInterface[] | null;
  upsertEnabledBots: (v: enabledBotsStateInterface["data"]) => void;
}

const _useEnabledBotsStore = create<enabledBotsStateInterface>()((set) => ({
  data: null,
  upsertEnabledBots: (state) => set({ data: state }),
}));

export const upsertEnabledBotsState: enabledBotsStateInterface["upsertEnabledBots"] =
  (v) => _useEnabledBotsStore.getState().upsertEnabledBots(v);

const useEnabledBotsStore = createSelectors(_useEnabledBotsStore);
export default useEnabledBotsStore;
