import { createAddressSchema } from "./../schemas/index";
import type {
  createOrderSchema,
  loginSchema,
  signUpSchema,
  updateAddressSchema,
  updateProfileSchema,
  verifyEmailSchema,
  verifyOrderSchema,
} from "@/schemas";
import type { RazorpayOrderOptions } from "react-razorpay";
import type z from "zod";

export type UserRegisterData = z.infer<typeof signUpSchema>;

export type UserLoginData = z.infer<typeof loginSchema>;

export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export type CreateAddressData = z.infer<typeof createAddressSchema>;

export type UpdateAddressData = z.infer<typeof updateAddressSchema>;

export type CreateOrderData = z.infer<typeof createOrderSchema>;

export type VerifyOrderData = z.infer<typeof verifyOrderSchema>;

//ADDRESS
export interface Address {
  id: string;
  address: string;
  city: string;
  pincode: number;
  state: string;
  country: string;
  type?: "HOME" | "OFFICE";
}

// PRODUCT
export interface Product {
  id: string;
  name: string;
  price: number;
  discount: string;
  discountAmount: number;
  image: File;
  categoryId: string;
  description: string;
  featured: string;
  color: string;
  averageRating: string;
  numOfReviews: number;
  isWishListed: boolean;
  isAddedToCart: boolean;
  sizes: {
    id: string;
    value: number;
  }[];
  category: {
    id: string;
    name: string;
  };
}

// USER
export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  contactNo?: string;
  email: string;
  status: "ACTIVE" | "LOCKED";
  gender?: UpdateProfileData["gender"];
  dob?: string;
  profileImage?: string;
  profileImageId?: string;
}

// ORDER
export interface Order {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: RazorpayOrderOptions["currency"];
  entity: string;
  id: string;
  notes: RazorpayOrderOptions["notes"];
  offer_id?: string;
  receipt?: string;
  status: string;
}
