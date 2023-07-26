import * as z from "zod";

export const addBucketSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});
