import * as z from "zod";

export const addUserSchema = z.object({
  email: z.string().trim().email().nonempty(),
});
