import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)), 
  lastName: z
    .string()
    .optional()
    .transform((value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : "")), 
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  dateOfBirth: z
    .string()
    .min(1, "Date of Birth is required")
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      return selected <= today;
    }, {
      message: "Date of Birth cannot be in the future",
    }),
  status: z.enum(["active", "locked"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export type UserFormData = {
  firstName: string;
  lastName?: string;
  email: string;
  dateOfBirth: string;
  status: "active" | "locked";
};
