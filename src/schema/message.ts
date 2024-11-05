import { z } from "zod";

export const messageSchema = z.object({
  id: z.number(),
  message: z.string(),
  read: z.boolean(),
  sender: z.string(),
  timestamp: z.string(),
});

export type MessageInterface = z.infer<typeof messageSchema>;
