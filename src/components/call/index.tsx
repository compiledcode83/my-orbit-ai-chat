import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Loader, PhoneCall } from "lucide-react";

import { startCall } from "~/actions/connect";
import { connectPeer } from "~/store/peer";

import { Button } from "../ui/button";

interface Props {
  receiver: string | number;
}

export default function VoiceCall({ receiver }: Props) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
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

  const handleCall = () => {
    if (typeof receiver === "number")
      router.navigate({
        to: "/chat/bot-call/$botId",
        params: { botId: String(receiver) },
      });
    mutate();
  };

  return (
    <Button
      disabled={isPending}
      variant="ghost"
      size="icon"
      onClick={handleCall}
    >
      {isPending ? (
        <Loader className="size-5 animate-spin" />
      ) : (
        <PhoneCall className="size-5" />
      )}
    </Button>
  );
}
