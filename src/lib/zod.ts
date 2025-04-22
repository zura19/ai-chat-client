import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is Required")
    .min(8, "Password must be at least 8 characters"),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is Required")
    .min(8, "Password must be at least 8 characters"),
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;
