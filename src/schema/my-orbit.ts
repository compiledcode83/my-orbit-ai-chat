import { z } from "zod";

export const myOrbitActivityIndicatorSchema = z.object({
  typing: z.boolean(),
  sender: z.string(),
  img_url: z.string().url().optional(),
  verified: z.boolean(),
  id: z.number(),
  type: z.enum(["Typing", "Thinking"]),
});

export const newBotMessageSchema = z.object({
  sender: z.string(),
  message: z.string(),
  img_url: z.string().url().optional(),
  verified: z.boolean(),
});

type MyOrbitActivityIndicatorInterface = z.infer<
  typeof myOrbitActivityIndicatorSchema
>;

type NewBotMessageInterface = z.infer<typeof newBotMessageSchema>;

export type { MyOrbitActivityIndicatorInterface, NewBotMessageInterface };
