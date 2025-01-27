import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";

import { getCallDetails } from "~/actions/connect";
import { connectPeer, usePeer } from "~/store/peer";
import useUserStore from "~/store/persist-storage/user";

const CallPage = () => {
  const params = Route.useParams();

  const { data: call } = useQuery({
    queryKey: ["get-call-details", params.callId],
    queryFn: async ({ queryKey }) => {
      const data = await getCallDetails(queryKey[1]);
      return data;
    },
  });

  const { localStream, remoteStream, peer } = usePeer(); // Access the streams from Zustand
  const user = useUserStore.use.data();
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  const myPeer = useMemo(() => {
    if (!call || !user?.user_id) return null;
    return call.find((c) => c.user_id === user.user_id);
  }, [user, call]);

  useEffect(() => {
    if (localStream && localAudioRef.current) {
      localAudioRef.current.srcObject = localStream;
      localAudioRef.current.play();
    }
    if (remoteStream && remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = remoteStream;
      remoteAudioRef.current.play();
    }
  }, [localStream, remoteStream]);

  useEffect(() => {
    if (myPeer?.peer_id && peer && peer.id !== myPeer.peer_id) {
      connectPeer({ peerId: myPeer.peer_id! });
    }

    if (
      peer &&
      myPeer?.peer_id &&
      peer.id === myPeer.peer_id &&
      peer.disconnected
    ) {
      peer.reconnect();
    }
  }, [myPeer?.peer_id, peer]);

  useEffect(() => {
    return () => {
      if (peer) peer.disconnect();
    };
  }, [peer]);

  return (
    <div>
      <h2>Voice Call</h2>
      <audio ref={localAudioRef} autoPlay muted playsInline />
      <audio ref={remoteAudioRef} autoPlay playsInline />
    </div>
  );
};

export const Route = createFileRoute("/_authed/chat/call/$callId")({
  component: CallPage,
});
