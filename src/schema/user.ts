import { z } from "zod";

// {
//                 "Name": "Orbie",
//                 "Profile_image": "https://intellecto-media-storage.s3.amazonaws.com/Orbit/Orbie.png",
//                 "Verified": true,
//                 "bot_id": 1,
//                 "is_online": true,
//                 "last_interacted": "Sun, 06 Oct 2024 16:07:28 GMT",
//                 "status": "Reimagine Everything",
//                 "type": "chatbot",
//                 "unread": true
//             },
//             {
//                 "Name": "Dhruv Bhatt",
//                 "Profile_image": "https://intellecto-media-storage.s3.amazonaws.com/Profile_photos/95e2f2e8-9fdc-467a-b209-db09991493a4.jpg?AWSAccessKeyId=AKIAQEE5SIIGRE2OFO65&Signature=2E4zth%2FSuqtDiONn%2F5lWlEgkEwE%3D&Expires=1728627536",
//                 "is_online": true,
//                 "last_interacted": "Mon, 23 Sep 2024 17:00:58 GMT",
//                 "mobile": "+919811976007",
//                 "status": "heyyyy",
//                 "type": "human",
//                 "unread": false,
//                 "user_id": "Dhruv_Bhatt"
// }

export const userSchema = z.object({
  email: z.string().email(),
  mobile: z.string(),
  profile_image: z.string(),
  username: z.string(),
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
