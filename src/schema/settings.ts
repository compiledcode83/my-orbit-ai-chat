import { z } from "zod";

export const profileSchema = z.object({
  display_name: z.string(),
  birthdate: z.date(),
  gender: z.string(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
  profile_image: z.string(),
});

export const updatePasswordSchema = z.object({
  oldPasscode: z.string(),
  newPasscode: z.string(),
  confirmPasscode: z.string(),
});

export type TProfileSchema = z.infer<typeof profileSchema>;
export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
