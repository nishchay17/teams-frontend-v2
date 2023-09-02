import * as z from "zod";

export const userSignupSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(6),
  passwordRecheck: z.string().min(6),
  joiningId: z.string(),
});
