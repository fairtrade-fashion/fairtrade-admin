import React, { useState, useMemo } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { productSchema } from "@/utils/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/dialog";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useGetSizesQuery } from "@/domain/products/api/size.api";
import { useGetColorsQuery } from "@/domain/products/api/colors.api";
import Select, { MultiValue } from "react-select";
import { useGetCategoriesQuery } from "@/domain/categories/api/category.api";
import { useCreateProductMutation } from "@/domain/products/api/product.api";
import { ProductRequest } from "@/domain/products/models/products.model";
import { toast } from "sonner";
import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";
interface VariantOption {
  value: string;
  label: string;
  stock: number;
}

export default function CreateProducts() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [imageFields, setImageFields] = useState([{ id: 0, url: "" }]);
  const [selectedSizes, setSelectedSizes] = useState<VariantOption[]>([]);
  const [selectedColors, setSelectedColors] = useState<VariantOption[]>([]);
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const [CreateProduct] = useCreateProductMutation();
  const handleError = useErrorHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
    control,
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      sizes: [],
      colors: [],
      imageUrls: [],
    },
  });

  // Modified options to include stock
  const sizeOptions: VariantOption[] = useMemo(
    () =>
      sizeData?.map((size) => ({
        value: size.size_id,
        label: size.name,
        stock: 0,
      })) || [],
    [sizeData]
  );

  const colorOptions: VariantOption[] = useMemo(
    () =>
      colorData?.map((color) => ({
        value: color.color_id,
        label: color.name,
        stock: 0,
      })) || [],
    [colorData]
  );

  // Stock input component for individual variants
  const StockInput = ({
    variant,
    onStockChange,
  }: {
    variant: VariantOption;
    onStockChange: (value: string, stock: number) => void;
  }) => (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-sm">{variant.label} Stock:</span>
      <input
        type="number"
        className="border rounded p-1 w-24"
        value={variant.stock}
        onChange={(e) => {
          const newStock = parseInt(e.target.value) || 0;
          onStockChange(variant.value, newStock);
        }}
        min="0"
      />
    </div>
  );

  // Handler for size selection
  const handleSizeChange = (newSelectedOptions: MultiValue<VariantOption>) => {
    // Convert to array, handling potential null
    const newSizes = newSelectedOptions || [];

    const updatedSizes = newSizes.map((newSize) => {
      const existingSize = selectedSizes.find((s) => s.value === newSize.value);
      return {
        ...newSize,
        stock: existingSize ? existingSize.stock : 0,
      };
    });

    setSelectedSizes(updatedSizes);
    setValue(
      "sizes",
      updatedSizes.map((size) => ({
        id: size.value,
        stock: size.stock,
      })),
      { shouldValidate: true }
    );
  };

  // Handler for color selection
  const handleColorChange = (newSelectedOptions: MultiValue<VariantOption>) => {
    // Convert to array, handling potential null
    const newColors = newSelectedOptions || [];

    const updatedColors = newColors.map((newColor) => {
      const existingColor = selectedColors.find(
        (c) => c.value === newColor.value
      );
      return {
        ...newColor,
        stock: existingColor ? existingColor.stock : 0,
      };
    });

    setSelectedColors(updatedColors);
    setValue(
      "colors",
      updatedColors.map((color) => ({
        id: color.value,
        stock: color.stock,
      })),
      { shouldValidate: true }
    );
  };

  // Handler for updating size stock
  const handleSizeStockChange = (value: string, newStock: number) => {
    // Update selected sizes with new stock
    const updatedSizes = selectedSizes.map((size) =>
      size.value === value ? { ...size, stock: newStock } : size
    );

    setSelectedSizes(updatedSizes);

    // Update form values
    setValue(
      "sizes",
      updatedSizes.map((size) => ({
        id: size.value,
        stock: size.stock,
      })),
      { shouldValidate: true }
    );
  };

  // Handler for updating color stock
  const handleColorStockChange = (value: string, newStock: number) => {
    // Update selected colors with new stock
    const updatedColors = selectedColors.map((color) =>
      color.value === value ? { ...color, stock: newStock } : color
    );

    setSelectedColors(updatedColors);

    // Update form values
    setValue(
      "colors",
      updatedColors.map((color) => ({
        id: color.value,
        stock: color.stock,
      })),
      { shouldValidate: true }
    );
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldId: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Here you would typically upload the file to your server/cloud storage
      // For now, we'll simulate an upload with a placeholder URL
      const imageUrl = URL.createObjectURL(file);

      // Update the imageFields state
      setImageFields((prev) =>
        prev.map((field) =>
          field.id === fieldId ? { ...field, url: imageUrl } : field
        )
      );

      // Update the form's imageUrls array
      const currentUrls = getValues("imageUrls") || [];
      const newUrls = [...currentUrls];
      newUrls[fieldId] = imageUrl;
      setValue("imageUrls", newUrls.filter(Boolean), {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const addImageField = () => {
    setImageFields((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((f) => f.id)) + 1 : 0;
      return [...prev, { id: newId, url: "" }];
    });
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      setIsSubmitting(true);

      if (!data.sizes.length || !data.colors.length || !data.imageUrls.length) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Update stock for all sizes and colors based on main stock value
      const updatedSizes = data.sizes.map((size) => ({
        ...size,
        stock: data.stock,
      }));

      const updatedColors = data.colors.map((color) => ({
        ...color,
        stock: data.stock,
      }));

      const cleanedData: ProductRequest = {
        ...data,
        sizes: updatedSizes,
        colors: updatedColors,
        imageUrls: data.imageUrls.filter(Boolean),
        price: Number(data.price),
        stock: Number(data.stock),
      };

      await CreateProduct(cleanedData).unwrap();
      toast.success("Product created successfully");

      // Reset form and state
      reset();
      setImageFields([{ id: 0, url: "" }]);
      setSelectedSizes([]);
      setSelectedColors([]);
      setDialogOpen(false);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white rounded p-2">
      <div className="flex items-center justify-between bg-white rounded text-xs">
        <p>List of products</p>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create product</Button>
          </DialogTrigger>
          <DialogContent className="h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
              <DialogDescription className="text-start">
                <form
                  className="flex flex-col gap-2 lg:gap-4 text-[10px]"
                  onSubmit={handleSubmit(onSubmit)}
                  aria-label="Create product form"
                >
                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                      className="border rounded p-2 outline-none"
                      id="name"
                      type="text"
                      {...register("name")}
                    />
                    {errors?.name && (
                      <p className="text-xs text-red-500 italic">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="border rounded p-2 outline-none"
                      id="description"
                      {...register("description")}
                    />
                    {errors?.description && (
                      <p className="text-xs text-red-500 italic">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="price">Price</label>
                    <input
                      id="price"
                      placeholder="Price"
                      className="border rounded p-2 outline-none"
                      type="number"
                      step="0.01"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors?.price && (
                      <p className="text-xs text-red-500 italic">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="stock">Stock Quantity</label>
                    <input
                      className="border rounded p-2 outline-none"
                      id="stock"
                      placeholder="Quantity"
                      type="number"
                      {...register("stock", {
                        valueAsNumber: true,
                        onChange: (e) => {
                          // Update stock for all sizes and colors when main stock changes
                          const newStock = parseInt(e.target.value) || 0;
                          const currentSizes = getValues("sizes");
                          const currentColors = getValues("colors");

                          setValue(
                            "sizes",
                            currentSizes.map((size) => ({
                              ...size,
                              stock: newStock,
                            }))
                          );
                          setValue(
                            "colors",
                            currentColors.map((color) => ({
                              ...color,
                              stock: newStock,
                            }))
                          );
                        },
                      })}
                    />
                    {errors?.stock && (
                      <p className="text-xs text-red-500 italic">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="categoryId">Category</label>
                    <select
                      id="categoryId"
                      {...register("categoryId")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a category</option>
                      {categoryData?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors?.categoryId && (
                      <p className="text-xs text-red-500 italic">
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="sizes">Sizes</label>
                    <Controller
                      name="sizes"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputId="sizes"
                          isMulti
                          placeholder="Choose size(s)"
                          options={sizeOptions}
                          value={selectedSizes}
                          onChange={(newValue) => {
                            handleSizeChange(newValue);
                            field.onChange(newValue);
                          }}
                          closeMenuOnSelect={false}
                        />
                      )}
                    />
                    {/* Stock inputs for selected sizes */}
                    {selectedSizes.map((size) => (
                      <StockInput
                        key={size.value}
                        variant={size}
                        onStockChange={handleSizeStockChange}
                      />
                    ))}
                    {errors?.sizes && (
                      <p className="text-xs text-red-500 italic">
                        {errors.sizes.message}
                      </p>
                    )}
                  </div>

                  {/* Colors Selection */}
                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="colors">Colors</label>
                    <Controller
                      name="colors"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputId="colors"
                          isMulti
                          placeholder="Choose color(s)"
                          options={colorOptions}
                          value={selectedColors}
                          onChange={(newValue) => {
                            handleColorChange(newValue);
                            field.onChange(newValue);
                          }}
                          closeMenuOnSelect={false}
                        />
                      )}
                    />
                    {/* Stock inputs for selected colors */}
                    {selectedColors.map((color) => (
                      <StockInput
                        key={color.value}
                        variant={color}
                        onStockChange={handleColorStockChange}
                      />
                    ))}
                    {errors?.colors && (
                      <p className="text-xs text-red-500 italic">
                        {errors.colors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="imageUrls">Product Images</label>
                    {imageFields.map((field) => (
                      <div key={field.id} className="flex flex-col gap-2">
                        <Input
                          id={`imageUrls-${field.id}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, field.id)}
                        />
                        {field.url && (
                          <img
                            src={field.url}
                            alt={`Product preview ${field.id}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                      </div>
                    ))}
                    {errors?.imageUrls && (
                      <p className="text-xs text-red-500 italic">
                        {errors.imageUrls.message}
                      </p>
                    )}

                    <Button
                      type="button"
                      className="my-2 lg:my-0 lg:mb-2"
                      onClick={addImageField}
                    >
                      Add Image
                    </Button>
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create Product"}
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
