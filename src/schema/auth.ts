import { z } from "zod";

export const getADemoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const signInSchema = z
  .object({
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone number must be provided",
    path: ["email"],
  });

export type TGetADemoSchema = z.infer<typeof getADemoSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;
