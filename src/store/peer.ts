import { Peer, PeerOptions } from "peerjs";
import { toast } from "sonner";
import { create } from "zustand";

import { getCallDetails } from "./call/details";
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

  localStream: MediaStream | null; // Store local stream
  remoteStream: MediaStream | null; // Store remote stream

  connect: (props?: {
    peerId?: string;
    successCB?: (peerId: string) => void;
    errorCB?: (error: string) => void;
  }) => void;

  makeCall: (peerId: string, call_type?: "voice" | "video") => Promise<void>;
}

const getUserMedia = navigator.mediaDevices.getUserMedia;

const _usePeerStore = create<PeerStateInterface>((set, get) => ({
  peer: null,
  peerId: null,

  connecting: false,
  connected: false,
  error: null,

  localStream: null,
  remoteStream: null,

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

    peer.on("call", async function (call) {
      const callData = getCallDetails();

      if (!callData) return;
      const stream = await getUserMedia({
        audio: true,
        video: false,
      }).catch(() => {
        toast.error("Permission Denied");
        return null;
      });

      if (!stream) return;
      set({ localStream: stream });
      call.answer(stream);
      call.on("stream", (remoteStream) => set({ remoteStream }));
    });
  },

  makeCall: async (peerId, call_type = "voice") => {
    const peer = get().peer;
    if (!peer) return;

    const stream = await getUserMedia({
      audio: true,
      video: call_type === "video",
    }).catch((error) => {
      if (error.name === "NotAllowedError") {
        toast.error("Permission denied by the user");
      } else if (error.name === "NotFoundError") {
        toast.error("No media devices found");
      } else {
        toast.error("An error occurred: ", error);
      }
      return null;
    });

    console.log("stream");
    console.log(stream);
    if (!stream) return;
    set({ localStream: stream });
    const call = peer.call(peerId, stream);
    call.on("stream", (remoteStream) => set({ remoteStream }));
  },
}));

export const connectPeer = _usePeerStore.getState().connect;
export const makeCall = _usePeerStore.getState().makeCall;

export const usePeer = createSelectors(_usePeerStore);
