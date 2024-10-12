import { useMutation } from "@tanstack/react-query";

import { answerCall, declineCall, useIncomingCallStore } from "~/store/call";

export default function IncomingCall() {
  const call = useIncomingCallStore.use.data();

  const { mutate: answer } = useMutation({ mutationFn: answerCall });
  const { mutate: decline } = useMutation({
    mutationFn: async () => declineCall(),
  });

  if (!call) return null;
  return (
    <div className="flex h-28 flex-row items-center gap-x-4 rounded-md bg-[#383644]">
      <div className="w-full max-w-16 space-y-1">
        <p className="line-clamp-1">Amanda</p>
        <small>Voice Call</small>
      </div>
    </div>
  );
}
