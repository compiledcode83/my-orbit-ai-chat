import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  mobile: z.string(),
  profile_image: z.string(),
  username: z.string(),
  user_id: z.string(),
});

const baseContactSchema = z.object({
  Name: z.string(),
  Profile_image: z.string().url(),
  status: z.string(),
  is_online: z.boolean(),
  unread: z.boolean(),
});

export const botContactSchema = baseContactSchema.extend({
  bot_id: z.number(),
  type: z.literal("chatbot"),
  Verified: z.boolean(),
});

export const humanContactSchema = baseContactSchema.extend({
  mobile: z.string(),
  type: z.literal("human"),
  user_id: z.string(),
});

export const contactSchema = z.union([botContactSchema, humanContactSchema]);
export const interactionContactSchema = z.union([
  botContactSchema.extend({ last_interacted: z.string() }),
  humanContactSchema.extend({ last_interacted: z.string() }),
]);

export type BotContactInterface = z.infer<typeof botContactSchema>;
export type UserContactInterface = z.infer<typeof humanContactSchema>;
export type ContactInterface = z.infer<typeof contactSchema>;
export type InteractionContactInterface = z.infer<
  typeof interactionContactSchema
>;
export type UserInterface = z.infer<typeof userSchema>;
