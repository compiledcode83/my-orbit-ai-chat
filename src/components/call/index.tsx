import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { PhoneCall } from "lucide-react";

import { startCall } from "~/actions/connect";
import { connectPeer } from "~/store/peer";

interface Props {
  receiver: string | number;
}

export default function VoiceCall({ receiver }: Props) {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const peerId = await new Promise<string>((res, rej) => {
        connectPeer({ successCB: res, errorCB: rej });
      });

      const callId = await startCall({
        call_type: "voice",
        peer_id: peerId,
        receiver,
      });

      router.navigate({ to: "/chat/call/$callId", params: { callId } });
    },
  });

  const handleCall = () => mutate();

  return (
    <button onClick={handleCall}>
      <PhoneCall />
    </button>
  );
}
