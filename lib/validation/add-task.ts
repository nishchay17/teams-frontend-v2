import * as z from "zod";

const MAX_FILE_SIZE_5_MB = 500000;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const addTaskSchema = z.object({
  name: z.string().nonempty(),
  assignedTo: z.string().nonempty(),
  description: z.string().nonempty(),
  file: z.any().optional(),
});

export const addTaskFilesSchema = z
  .any()
  .refine(
    (files: any[]) => !files.some((file) => file?.size <= MAX_FILE_SIZE_5_MB),
    "Max file size is 5MB."
  )
  .refine(
    (files: any[]) =>
      !files.some((file) => ACCEPTED_FILE_TYPES.includes(file?.type)),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );
