import * as z from "zod";

export const addBucketSchema = z.object({
  name: z.string().trim().nonempty(),
  description: z.string().trim().optional(),
  file: z.any().optional(),
});
