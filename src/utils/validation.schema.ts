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
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
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
  name: z.string().nonempty("Name is required."),
  description: z.string().nonempty("Description is required."),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0."),
  stockQuantity: z.coerce
    .number()
    .int()
    .min(0, "Stock Quantity must be greater than or equal to 0."),
  category_id: z.string().nonempty("Category is required."),
  sizes: z.array(z.string()).nonempty("At least one size is required."),
  colors: z.array(z.string()).nonempty("At least one color is required."),
  productImages: z
    .array(z.instanceof(File))
    .nonempty("At least one product image is required."),
});
