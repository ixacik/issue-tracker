import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Empty title.").max(255, "Title is too long."),
  description: z
    .string()
    .min(1, "Empty description.")
    .max(500, "Description is too long."),
});

export const updateIssueStatusSchema = z.object({
  id: z.number().int(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password is too short."),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Empty name.").max(255, "Name is too long."),
  email: z.string().email(),
  password: z.string().min(8, "Password is too short."),
});
