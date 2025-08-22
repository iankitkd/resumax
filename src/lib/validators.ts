import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, {
    error: "Name must be at least 2 characters.",
  }),
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters.",
  }),
});

export const signinSchema = z.object({
  email: z.email({
    error: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters.",
  }),
});

export type SignupValues = z.infer<typeof signupSchema>;
export type SigninValues = z.infer<typeof signinSchema>;