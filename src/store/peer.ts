import { Peer, PeerOptions } from "peerjs";
import { create } from "zustand";

import { createSelectors } from "./zustand";

export const peerOptions: PeerOptions = {
  host: import.meta.env.VITE_PEER_URL,
  path: "/peerjs",
  secure: true,
  debug: 3,
};

export interface PeerStateInterface {
  peer: Peer | null;
  peerId: string | null;

  connecting: boolean;
  connected: boolean;
  error: string | null;

  connect: (props?: {
    peerId?: string;
    successCB?: (peerId: string) => void;
    errorCB?: (error: string) => void;
  }) => void;
}

const _usePeerStore = create<PeerStateInterface>((set) => ({
  peer: null,
  peerId: null,

  connecting: false,
  connected: false,
  error: null,

  connect: (props) => {
    set({
      connected: false,
      peer: null,
      peerId: null,
      connecting: true,
      error: null,
    });

    const peer = props?.peerId
      ? new Peer(props.peerId, peerOptions)
      : new Peer(peerOptions);
    set({ peer });

    peer.on("open", (id) => {
      set({ peerId: id, connected: true, connecting: false });
      if (props?.successCB) props.successCB(id);
    });

    peer.on("error", (e) => {
      set({ peer: null, connecting: false, error: e.message });
      if (props?.errorCB) props.errorCB(e.message);
    });
  },
}));

export const connectPeer = _usePeerStore.getState().connect;

export const usePeer = createSelectors(_usePeerStore);
