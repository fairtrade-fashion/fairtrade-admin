import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditProductMutation } from "@/domain/products/api/product.api";
import { useGetCategoriesQuery } from "@/domain/categories/api/category.api";
import { useGetColorsQuery } from "@/domain/products/api/colors.api";
import { useGetSizesQuery } from "@/domain/products/api/size.api";
import { ProductFormData, productSchema } from "@/utils/validation.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

import { toast } from "sonner";
import { SizeInput } from "./size-input";
import { ColorInput } from "./color-input";
import ImageUploader from "./image-uploader";
import LoadingButton from "@/components/loading-button";
import { ProductData } from "./types/product-types";

interface EditProductFormProps {
  productData: ProductData;
  onSucess: () => void;
}

export default function EditProductForm({
  productData,
  onSucess,
}: EditProductFormProps) {
  const [updateProduct, { isLoading: isUpdating, isSuccess }] =
    useEditProductMutation();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: categoryData } = useGetCategoriesQuery();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: productData?.name,
      description: productData?.description,
      categoryId: productData?.category?.id,
      sizes: JSON.stringify(
        productData?.sizes.map((s) => ({ id: s.size.id, stock: s.stock }))
      ),
      colors: JSON.stringify(
        productData?.colors.map((c) => ({ id: c.color.id, stock: c.stock }))
      ),
      price: productData?.price.toString(),
      stock: productData?.stock.toString(),
      images: [],
    },
  });

  async function onSubmit(values: ProductFormData) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((file) => {
          formData.append("images", file);
        });
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await updateProduct({
        id: productData.id,
        data: formData,
      }).unwrap();
      console.log("Product update response:", response);
      toast.success("Product updated successfully");
      isSuccess && onSucess();
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryData?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sizes</FormLabel>
              <SizeInput
                control={form.control}
                sizes={sizeData || []}
                onChange={(sizes) => field.onChange(JSON.stringify(sizes))}
                initialSizes={JSON.parse(field.value || "[]")}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <ColorInput
                control={form.control}
                colors={colorData || []}
                onChange={(colors) => field.onChange(JSON.stringify(colors))}
                initialColors={JSON.parse(field.value || "[]")}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <ImageUploader
                onImagesChange={(files) => field.onChange(files)}
                existingImages={productData?.images}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton loading={isUpdating} type="submit">
          Update Product
        </LoadingButton>
      </form>
    </Form>
  );
}
