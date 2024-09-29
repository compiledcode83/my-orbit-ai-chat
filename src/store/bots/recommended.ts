import { create } from "zustand";

import { BotInterface } from "~/schema/bot";

import { createSelectors } from "../zustand";

export interface recommendedBotsStateInterface {
  data: BotInterface[] | null;
  upsertRecommendedBots: (v: recommendedBotsStateInterface["data"]) => void;
}

const _useRecommendedBotsStore = create<recommendedBotsStateInterface>()(
  (set) => ({
    data: null,
    upsertRecommendedBots: (state) => set({ data: state }),
  }),
);

export const upsertRecommendedBotsState: recommendedBotsStateInterface["upsertRecommendedBots"] =
  (v) => _useRecommendedBotsStore.getState().upsertRecommendedBots(v);

const useRecommenedBotsStore = createSelectors(_useRecommendedBotsStore);
export default useRecommenedBotsStore;
