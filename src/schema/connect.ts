import { z } from "zod";

export const startCallSchema = z.object({
  call_type: z.enum(["video", "voice"]),
  receiver: z.union([z.string(), z.number()]),
  peer_id: z.string(),
});

export const callDetailSchema = z.object({
  name: z.string(),
  peer_id: z.string().nullable(),
  profile_photo: z.string(),
  user_call_status: z.enum(["calling", "in_call"]),
  user_id: z.string(),
});

export type StartCallInterface = z.infer<typeof startCallSchema>;
export type CallDetailInterface = z.infer<typeof callDetailSchema>;
