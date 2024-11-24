import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProductMutation } from "@/domain/products/api/product.api";
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
import { SizeInput } from "./size-input";
import { ColorInput } from "./color-input";
import ImageUploader from "./image-uploader";
import LoadingButton from "@/components/loading-button";
import { toast } from "sonner";

export default function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: categoryData } = useGetCategoriesQuery();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      sizes: "",
      colors: "",
      price: "",
      stock: "",
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
      const response = await createProduct(formData).unwrap();
      console.log("Create product response:", response);
      toast.success("Product created successfully");
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product");
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
                <Input placeholder="Enter product name" {...field} />
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
                <Textarea
                  placeholder="Tell us about the product"
                  className="resize-none"
                  {...field}
                />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Input placeholder="Enter price" {...field} />
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
                <Input placeholder="Enter stock" {...field} />
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
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isLoading}
          children="Create Product"
          type="submit"
        />
      </form>
    </Form>
  );
}
