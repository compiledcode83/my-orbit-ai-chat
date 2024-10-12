/* eslint-disable react-hooks/rules-of-hooks */
import { createFileRoute } from "@tanstack/react-router";
import Peer from "peerjs";
import { useEffect } from "react";

import { getCallDetails } from "~/actions/connect";
import { peerOptions, setPeer, usePeer } from "~/store/peer";
import useUserStore, { getUser } from "~/store/persist-storage/user";

export const Route = createFileRoute("/_authed/chat/call/$callId")({
  loader: async ({ params }) => {
    const data = await getCallDetails(params.callId);
    const user = getUser()!;

    const peer = data.find((p) => p.user_id === user.username);
    if (!peer || !peer.peer_id || peer.user_call_status !== "in_call") {
      throw new Error("something went wrong");
    }

    return { peer: { ...peer, peer_id: peer.peer_id! }, data };
  },
  component: () => {
    const peer = usePeer.use.peer();
    const user = useUserStore.use.data();
    const { peer: currentUserPeer } = Route.useLoaderData();

    useEffect(() => {
      if (!peer && user?.username) {
        const newPeer = new Peer(currentUserPeer.peer_id, peerOptions);
        setPeer(newPeer);
      }
    }, [peer, user, currentUserPeer.peer_id]);

    useEffect(() => {
      if (peer?.disconnected) {
        peer.reconnect();
      }
    }, [peer]);

    useEffect(() => {
      return () => {
        if (peer) peer.disconnect();
      };
    }, [peer]);

    return <div>Hello /_authed/chat/call/$callId!</div>;
  },
});
