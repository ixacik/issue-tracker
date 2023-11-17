import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Empty title.").max(255, "Title is too long."),
  description: z
    .string()
    .min(1, "Empty description.")
    .max(500, "Description is too long."),
});
