import { z } from "zod";

const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._]*@[a-zA-Z]+\.(com|net|org|in)$/;

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z
      .string()
      .email("Invalid email address")
      .regex(emailRegex,"Please Enter Valid Email"),
    company: z.string().min(2, "Company name must be at least 2 characters long").optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default registerSchema;
