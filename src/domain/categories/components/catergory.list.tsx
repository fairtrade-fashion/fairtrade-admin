import { Button } from "@/components/button";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../api/category.api";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { categorySchema } from "@/utils/validation.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { toast } from "sonner";
import { useState } from "react";
import { CategoryResponse } from "@/utils/models/model";
import useErrorHandler from "../hooks/handle_submit.hooks";

export default function CategoryList() {
  const { data: categoryData } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);
  const handleError = useErrorHandler();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    if (editingCategory) {
      // For updating an existing category
      await updateCategory({
        id: editingCategory.id,
        data: data, // This matches the CategoryPost type
      })
        .unwrap()
        .then(() => {
          toast.success("Category Updated Successfully");
          setDialogOpen(false);
          setEditingCategory(null);
          form.reset({ name: "" });
        })
        .catch((error) => {
          handleError(error);
        });
    } else {
      // For creating a new category
      await createCategory(data)
        .unwrap()
        .then(() => {
          toast.success("Category Created Successfully");
          setDialogOpen(false);
          form.reset({ name: "" });
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };
  const handleEdit = (category: CategoryResponse) => {
    setEditingCategory(category);
    form.reset({
      name: category.name,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id)
        .unwrap()
        .then(() => {
          toast.success("Category Deleted Successfully");
        })

        .catch((error) => {
          handleError(error);
        });
    }
  };

  const handleCreateNewCategory = () => {
    setEditingCategory(null);
    form.reset({ name: "" });
    setDialogOpen(true);
  };

  return (
    <main className="w-full h-full flex flex-col gap-5">
      <div className="flex items-center justify-between p-3 bg-white rounded">
        <p>List of categories</p>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button onClick={handleCreateNewCategory}>
              Create new category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Create New Category"}
            </DialogTitle>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <Input {...form.register("name")} />
                {form.formState.errors.name?.message}
              </div>
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <Textarea {...form.register("description")} />
                {form.formState.errors.description?.message}
              </div> */}
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="">
        <div className="grid lg:grid-cols-3 gap-4 w-full text-xs lg:text-base">
          {categoryData?.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg p-4 flex flex-col gap-3 border-2 drop-shadow-sm hover:scale-[1.01] transition-all ease-linear duration-500"
            >
              <div className="flex items-center justify-between">
                <p className="lg:text-lg font-bold capitalize">
                  {category.name}
                </p>
              </div>

              <div className="flex items-end justify-end h-full gap-2">
                <Button onClick={() => handleEdit(category)}>Edit</Button>
                <Button onClick={() => handleDelete(category.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
