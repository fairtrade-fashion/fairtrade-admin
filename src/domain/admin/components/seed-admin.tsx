import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AdminUserForm, adminUserSchema } from "../model/admin.model";
import { useCreateAdminUserMutation } from "../api/admin.api";
import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";
import { toast } from "sonner";

export default function SeedAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [CreateAdminUser] = useCreateAdminUserMutation();
  const handleError = useErrorHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUserForm>({
    resolver: zodResolver(adminUserSchema),
  });

  const onSubmit = async (data: AdminUserForm) => {
    setIsLoading(true);
    try {
      await CreateAdminUser(data);
      toast.success("Admin User Created Successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create An Admin User</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Admin...
            </>
          ) : (
            "Create Admin"
          )}
        </Button>
      </form>
    </div>
  );
}
