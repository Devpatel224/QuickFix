import { z } from "zod";

const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._]*@[a-zA-Z]+\.(com|net|org|in)$/;

export const registerSchema = z
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


export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(2, "Password must be at least two characters"),
    company: z.string().optional(), 
  }); 


export const serviceSchema = z.object({
  servicename: z.string().min(2, "Service name is required"),
  description: z.string().min(5, "Description is required"),
  visitprice: z
    .string()
    .min(1, "Visit price is required")
    .refine(val => !isNaN(Number(val)), "Visit price must be a number"),
  category: z.string().min(2, "Category is required"),
  address: z.string().min(3, "Address is required"),
  adharnumber: z
    .string()
    .length(12, "Aadhar number must be 12 digits")
    .refine(val => /^\d{12}$/.test(val), "Invalid Aadhar number"),
  image: z
    .any()
    .refine((file) => file instanceof File, "Image is required")
});

export const serviceRequestSchema = z.object({
  address: z.string().min(3, "Address is required"),
  contact: z
    .string()
    .length(10, "Contact number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Contact must contain only digits"),
  date: z
    .string()
});



