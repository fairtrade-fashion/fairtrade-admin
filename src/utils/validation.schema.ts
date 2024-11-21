import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be 50 characters or less" }),
});
export const colorSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be 50 characters or less" }),
});
export const sizeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be 50 characters or less" }),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().positive("Stock must be a positive integer"),
  categoryId: z.string().min(1, "Category ID is required"),
  imageUrls: z
    .array(z.string().url("Invalid URL"))
    .min(1, "At least one image URL is required"),
  sizes: z.array(
    z.object({
      id: z.string(),
      stock: z.number(),
    })
  ),
  colors: z.array(
    z.object({
      id: z.string(),
      stock: z.number(),
    })
  ),
});
