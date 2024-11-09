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

export const selectBotResponseSchema = z.object({
  cost: z.number(),
  creator: z.string(),
  description: z.string(),
  enabled: z.literal(true),
  id: z.number(),
  is_chatbot_paid: z.boolean(),
  name: z.string(),
  parody: z.boolean(),
  thumbnail: z.string().url(),
});

export type BotInterface = z.infer<typeof botSchema>;
export type SelectBotResponse = z.infer<typeof selectBotResponseSchema>;
