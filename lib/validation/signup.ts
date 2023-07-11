import * as z from "zod";

export const userSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  passwordRecheck: z.string().min(6),
  name: z.string().min(1),
  mobile: z.string().min(10).max(10),
  joiningKey: z.string(),
});
