import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createSelectors } from "../zustand";

export interface RightPanelStateInterface {
  data: "your-avatar" | "auto-ai" | null;
  upsertRightPanelState: (v: RightPanelStateInterface["data"]) => void;
}

const _useRightPanelStore = create<RightPanelStateInterface>()(
  persist(
    (set) => ({
      data: "your-avatar",
      upsertRightPanelState: (state) => set({ data: state }),
    }),
    {
      name: "side-panel-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const useRightPanelStore = createSelectors(_useRightPanelStore);

export const upsertRightPanelState: RightPanelStateInterface["upsertRightPanelState"] =
  (v) => _useRightPanelStore.getState().upsertRightPanelState(v);

export default useRightPanelStore;
