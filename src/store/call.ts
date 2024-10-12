import { create } from "zustand";

import { connectPeer } from "./peer";
import { emitWSMessage } from "./socket";
import { createSelectors } from "./zustand";

interface IncomingCallStateInterface {
  data: {
    sender: string;
    notification_type: string;
    call_id: string;
    call_type: string;
  } | null;
  answerCall: () => Promise<void | { peerId: string }>;
  declineCall: () => void;
}

const _useIncomingCallStore = create<IncomingCallStateInterface>(
  (set, get) => ({
    data: null,
    answerCall: async () => {
      const call = get().data;
      if (!call) return;

      const peerId = await new Promise<string>((res, rej) => {
        connectPeer({ successCB: res, errorCB: rej });
      });

      emitWSMessage({
        action: "answer_call",
        data: {
          call_id: call.call_id,
          peer_id: peerId,
        },
      });

      set({ data: null });
      return { peerId };
    },
    declineCall: () => {
      const data = get().data;
      if (!data) return;

      emitWSMessage({
        action: "decline_call",
        data: { call_id: data.call_id },
      });
      set({ data: null });
    },
  }),
);

export const answerCall = _useIncomingCallStore.getState().answerCall;
export const declineCall = _useIncomingCallStore.getState().declineCall;

export const useIncomingCallStore = createSelectors(_useIncomingCallStore);
