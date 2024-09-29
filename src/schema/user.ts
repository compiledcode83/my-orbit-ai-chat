import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  mobile: z.string(),
  profile_image: z.string(),
  username: z.string(),
});

export type UserInterface = z.infer<typeof userSchema>;
