import { create } from "zustand";

import { CallDetailInterface } from "~/schema/connect";

import { createSelectors } from "../zustand";

interface CallDetailsStore {
  data: { callId: string; peoples: CallDetailInterface[] } | null;
  setCallData: (props: CallDetailsStore["data"]) => void;
}

const _useCallDetailsStore = create<CallDetailsStore>((set) => ({
  data: null,
  setCallData: (props) => set({ data: props }),
}));

export const setCallDetails = _useCallDetailsStore.getState().setCallData;
export const getCallDetails = () => _useCallDetailsStore.getState().data;

export const useCallDetailsStore = createSelectors(_useCallDetailsStore);
