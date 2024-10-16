import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

import {
  answerCall,
  declineCall,
  useIncomingCallStore,
} from "~/store/call/incoming-call";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function IncomingCall() {
  const router = useRouter();
  const call = useIncomingCallStore.use.data();

  const { mutate: answer, isPending: answering } = useMutation({
    mutationFn: answerCall,
    onSuccess: (res) => {
      if (res)
        router.navigate({
          to: "/chat/call/$callId",
          params: { callId: res.callId },
        });
    },
  });

  const { mutate: decline, isPending: declining } = useMutation({
    mutationFn: async () => declineCall(),
  });

  const disabledButton = answering || declining;

  if (!call) return null;
  return (
    <div className="absolute right-10 top-6 flex h-24 flex-row items-center gap-x-4 rounded-2xl bg-[#383644] pr-6">
      <Avatar className="-ml-6 size-16 border border-white">
        <AvatarImage src={"/assets/profile.png"} />
        <AvatarFallback asChild>
          <img src="/assets/profile.png" />
        </AvatarFallback>
      </Avatar>

      <div className="flex w-full max-w-16 flex-col justify-center text-white">
        <p className="line-clamp-1">{call.sender}</p>
        <small className="capitalize">{call.call_type} Call</small>
      </div>

      <button disabled={disabledButton} onClick={() => answer()}>
        <img src="/assets/call/answer-call.svg" alt="answer-call" />
      </button>

      <button disabled={disabledButton} onClick={() => decline()}>
        <img src="/assets/call/reject-call.svg" alt="decline-call" />
      </button>
    </div>
  );
}
