import { z } from "zod";

export const botSchema = z.object({
  active: z.boolean(),
  cost: z.number(),
  creator: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  id: z.number(),
  is_chatbot_paid: z.boolean(),
  name: z.string(),
  parody: z.boolean(),
  thumbnail: z.string(),
});

export type BotInterface = z.infer<typeof botSchema>;
