import { z } from "zod";

export const teamFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Team name must be at least 3 characters long")
    .max(40, "Team name cannot exceed 40 characters"),
  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters long")
    .max(200, "Description cannot exceed 200 characters"),
});

export type TeamFormValues = z.infer<typeof teamFormSchema>;
