import { z } from "zod";

const phoneRegex = /^([+]?\d{1,2}\s?|)\d{3}[.\s-]?\d{3}[.\s-]?\d{4}$/;

// AUTH
export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name is required")
    .max(20, "First name is too long"),
  lastName: z.string().max(20, "Last name is too long").optional(),
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password is too long")
    .refine((val) => /[A-Z]/.test(val), {
      error: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      error: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
  contactNo: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(12, "Contact number must be at most 12 digits")
    .regex(phoneRegex, "Invalid contact number format")
    .trim(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain  at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain  at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
});

export const verifyEmailSchema = z.object({
  email: z.email("Invalid email address").trim(),
  token: z.string(),
});

export const forgetPasswordSchema = z.object({
  email: z.email("Invalid email").trim(),
});

export const resetPasswordSchema = z.object({
  email: z.email("Invalid email").trim(),
  passwordCode: z
    .string()
    .length(6, "Code must be 6 characters long.")
    .regex(/^\d+$/, "Code must contain only digits.")
    .trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[@$!%*?]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
});

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name is required")
    .max(20, "First name is too long"),
  lastName: z.string().max(20, "Last name is too long").optional().nullable(),
  contactNo: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(12, "Contact number must be at most 12 digits")
    .regex(phoneRegex, "Invalid contact number format")
    .trim(),
  gender: z.enum(["MALE", "FEMALE"]).nullable().optional(),
  dob: z.coerce.date().nullable().optional(),
});

// ADDRESS
export const createAddressSchema = z.object({
  address: z
    .string()
    .min(10, "Please enter address minimum 10 characters")
    .max(200, "Address cannot exceeds 200 character"),
  city: z
    .string()
    .min(3, "Please enter valid city name (min 3 characters)")
    .max(20, '"Please enter valid city name (max 20 characters)")'),
  pincode: z
    .number({ error: "Please enter a valid pincode" })
    .int({ error: "Please enter a valid pincode" }),
  state: z
    .string()
    .min(3, "Please enter valid state name")
    .max(20, "Please enter valid state name"),
  type: z.enum(["HOME", "OFFICE"]),
});

export const updateAddressSchema = z.object({
  address: z
    .string()
    .min(10, "Please enter address minimum 10 characters")
    .max(200, "Address cannot exceeds 200 character")
    .optional(),
  city: z
    .string()
    .min(3, "Please enter valid city name (min 3 characters)")
    .max(20, '"Please enter valid city name (max 20 characters)")')
    .optional(),
  pincode: z
    .number({ error: "Please enter a valid pincode" })
    .int({ error: "Please enter a valid pincode" })
    .optional(),
  state: z
    .string()
    .min(3, "Please enter valid state name")
    .max(20, "Please enter valid state name")
    .optional(),
  type: z.enum(["HOME", "OFFICE"]).optional(),
});

// ORDER
export const createOrderSchema = z.object({
  addressId: z.string(),
  coupon: z.string().nullable().optional(),
});

export const verifyOrderSchema = z.object({
  paymentId: z.string(),
  signature: z.string(),
  orderId: z.string(),
});
