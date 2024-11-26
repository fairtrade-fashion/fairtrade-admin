import { ProductFormData } from "@/utils/validation.schema";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  control: Control<ProductFormData>; // Use correct type from `react-hook-form`
  type?: string;
  errors?: any; // Error object from `react-hook-form`
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  control,
  type = "text",
  errors,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium">
      {label}
    </label>
    <Controller
      name={name as keyof ProductFormData}
      control={control}
      render={({ field }) => (
        <input
          type={type}
          id={name}
          {...field}
          value={typeof field.value === "string" ? field.value : ""}
          className="mt-1 block w-full border rounded"
        />
      )}
    />
    {errors?.[name] && (
      <p className="text-red-500 text-sm mt-1">
        {errors[name]?.message || "something went wrong"}
      </p>
    )}
  </div>
);
