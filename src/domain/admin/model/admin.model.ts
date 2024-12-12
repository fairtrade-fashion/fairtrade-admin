import { z } from "zod";

export const adminUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),
});

export type AdminUserForm = z.infer<typeof adminUserSchema>;

export interface AdminUserResponseRoot {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  googleId: string;
  createdAt: string;
  updatedAt: string;
}
