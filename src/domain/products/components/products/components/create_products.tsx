import React, { useState, useMemo, useCallback } from "react";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGetSizesQuery } from "@/domain/products/api/size.api";
import { useGetColorsQuery } from "@/domain/products/api/colors.api";
import Select from "react-select";
import { useGetCategoriesQuery } from "@/domain/categories/api/category.api";
import { useCreateProductMutation } from "@/domain/products/api/product.api";
import { ProductRequest } from "@/domain/products/models/products.model";
import { toast } from "sonner";
import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";

export interface SelectOption {
  value: string;
  label: string;
}

export default function CreateProducts() {
  const [_, setIsSubmitting] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [imageFields, setImageFields] = useState([{ id: 0 }]);

  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const [CreateProduct] = useCreateProductMutation();
  const handleError = useErrorHandler();

  const sizeOptions: SelectOption[] = useMemo(
    () =>
      sizeData?.map((size) => ({
        value: size.size_id,
        label: size.name,
      })) || [],
    [sizeData]
  );

  const colorOptions: SelectOption[] = useMemo(
    () =>
      colorData?.map((color) => ({
        value: color.color_id,
        label: color.name,
      })) || [],
    [colorData]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stockQuantity: 0,
      category_id: "",
      sizes: [],
      colors: [],
      productImages: [],
    },
  });

  const handleChangeSize = useCallback(
    (selectedOptions: readonly SelectOption[]) => {
      const selectedValues = selectedOptions.map((option) => option.value);
      setSizes(selectedValues);
      setValue(
        "sizes",
        selectedValues.length > 0
          ? (selectedValues as [string, ...string[]])
          : [""]
      ); // Ensure at least one element
    },
    [setValue]
  );

  const handleChangeColor = useCallback(
    (selectedOptions: readonly SelectOption[]) => {
      const selectedValues = selectedOptions.map((option) => option.value);
      setColors(selectedValues);
      setValue(
        "colors",
        selectedValues.length > 0
          ? (selectedValues as [string, ...string[]])
          : [""]
      ); // Ensure at least one element
    },
    [setValue]
  );

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const newImages = [...getValues("productImages")];
        newImages[index] = files[0];
        setValue("productImages", newImages as [File, ...File[]]);
      }
    },
    [getValues, setValue]
  );

  const addImageField = useCallback(() => {
    setImageFields((prev) => [...prev, { id: prev.length }]);
    const currentImages = getValues("productImages");
    setValue("productImages", [...currentImages, new File([], "placeholder")]);
  }, [getValues, setValue]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof productSchema>) => {
      console.log(data);
      const productRequest: ProductRequest = {
        name: data.name,
        description: data.description,
        price: data.price,
        stockQuantity: data.stockQuantity,
        category_id: data.category_id,
        sizes: data.sizes,
        colors: data.colors,
        productImages: data.productImages
          .filter((file): file is File => file instanceof File && file.size > 0)
          .map((file) => ({
            imageUrl: URL.createObjectURL(file),
          })),
      };

      try {
        setIsSubmitting(true);
        const response = await CreateProduct(productRequest).unwrap();
        console.log("Product created successfully:", response);
        setDialogOpen(false);
        reset();
        setSizes([]);
        setColors([]);
        toast.success("Product created successfully");
      } catch (error) {
        handleError(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [CreateProduct, setDialogOpen, reset]
  );

  return (
    <main className="bg-white rounded p-2">
      <div className="flex items-center justify-between bg-white rounded text-xs ">
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
                      placeholder="price"
                      className="border rounded p-2 outline-none"
                      type="number"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors?.price && (
                      <p className="text-xs text-red-500 italic">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="stockQuantity">Stock Quantity</label>
                    <input
                      className="border rounded p-2 outline-none"
                      id="stockQuantity"
                      placeholder="Quantity"
                      type="number"
                      {...register("stockQuantity", { valueAsNumber: true })}
                    />
                    {errors?.stockQuantity && (
                      <p className="text-xs text-red-500 italic">
                        {errors.stockQuantity.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="category_id">Category</label>
                    <select
                      id="category_id"
                      {...register("category_id")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a category</option>
                      {categoryData?.map((category) => (
                        <option
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors?.category_id && (
                      <p className="text-xs text-red-500 italic">
                        {errors.category_id.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="sizes">Sizes</label>
                    <Select
                      inputId="sizes"
                      isMulti
                      placeholder="Choose size(s)"
                      options={sizeOptions}
                      onChange={handleChangeSize}
                      value={sizeOptions.filter((option) =>
                        sizes.includes(option.value)
                      )}
                    />

                    {errors?.sizes && (
                      <p className="text-xs text-red-500 italic">
                        {errors.sizes.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="colors">Colors</label>
                    <Select
                      inputId="colors"
                      isMulti
                      placeholder="Choose color(s)"
                      options={colorOptions}
                      onChange={handleChangeColor}
                      value={colorOptions.filter((option) =>
                        colors.includes(option.value)
                      )}
                    />

                    {errors?.colors && (
                      <p className="text-xs text-red-500 italic">
                        {errors.colors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col lg:gap-2">
                    <label htmlFor="productImages">Product Images</label>
                    {imageFields.map((field) => (
                      <Input
                        key={field.id}
                        id={`productImages-${field.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, field.id)}
                      />
                    ))}
                    {errors?.productImages && (
                      <p className="text-xs text-red-500 italic">
                        {errors.productImages.message}
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
                    <Button type="submit">Submit</Button>
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
