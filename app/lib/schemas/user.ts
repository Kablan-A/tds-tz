import { z } from "zod";

export const USER_FORM_SCHEMA = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  skillset: z.string().min(1, "At least one skill is required"),
});

export type UserFormValues = z.infer<typeof USER_FORM_SCHEMA>;
