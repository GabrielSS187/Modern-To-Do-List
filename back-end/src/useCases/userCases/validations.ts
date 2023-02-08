import { string, z } from "zod";

export const registerRequestSchema = z.object({
  userName: string().trim()
  .regex(/^\S+\s*$/, {message: "Username cannot contain spaces."})
  .min(4, {message: "Username at least 4 characters."})
  .max(20, {message: "Maximum character username is 20."}),
  password: string().trim()
  .regex(/^\S+\s*$/, {message: "Password cannot contain spaces."})
  .min(6, {message: "Password minimum characters is 6."})
  .max(8, {message: "Maximum password of characters is 8."})
});

export const signInRequestSchema = z.object({
  userName: string().trim(),
  password: string().trim(),
});

export type TRegisterRequest = z.infer<typeof registerRequestSchema>;
export type TSignInRequest = z.infer<typeof signInRequestSchema>;