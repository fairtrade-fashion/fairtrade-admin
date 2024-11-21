import { useGetCategoriesQuery } from "@/domain/categories/api/category.api";
import { EditProduct, Product } from "@/domain/products/models/products.model";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

interface EditProductForm extends Omit<EditProduct, "sizes" | "colors"> {
  sizes: { value: string; label: string }[];
  colors: { value: string; label: string }[];
}

export const EditProductModal: React.FC<{
  product: Product;
  onClose: () => void;
  onSubmit: (data: EditProduct) => void;
  sizeOptions: { value: string; label: string }[];
  colorOptions: { value: string; label: string }[];
}> = ({ product, onClose, onSubmit, sizeOptions, colorOptions }) => {
  const { control, handleSubmit, register } = useForm<EditProductForm>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      category_id: product.category_id,
      sizes: product.sizes.map((size) => ({
        value: size.size_id,
        label: size.name,
      })),
      colors: product.colors.map((color) => ({
        value: color.color_id,
        label: color.name,
      })),
    },
  });

  const { data: categoryData } = useGetCategoriesQuery();

  const onSubmitForm = (data: EditProductForm) => {
    onSubmit({
      ...data,
      sizes: data.sizes.map((size) => size.value),
      colors: data.colors.map((color) => color.value),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className=" font-bold mb-4">Edit Product</h2>
        <form
          className="flex flex-col gap-2 text-xs"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="flex gap-1 flex-col">
            <label htmlFor="name">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Name"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Description"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price">Price</label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Price"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="stockQuantity">Stock Quantity</label>
            <Controller
              name="stockQuantity"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Stock Quantity"
                />
              )}
            />
          </div>

          <div className="">
            <label htmlFor="category_id">Category</label>
            <select
              {...register("category_id", { required: true })}
              className="w-full border rounded p-2"
            >
              {categoryData?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sizes">Sizes</label>
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={sizeOptions}
                  className="mb-2"
                  placeholder="Select Sizes"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="colors">Colors</label>
            <Controller
              name="colors"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={colorOptions}
                  className="mb-2"
                  placeholder="Select Colors"
                />
              )}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
