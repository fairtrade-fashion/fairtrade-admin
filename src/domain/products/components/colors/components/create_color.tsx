import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Input } from "@/components/input";
import { useCreateColorMutation } from "@/domain/products/api/colors.api";
import { colorSchema } from "@/utils/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function CreateColor() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [createColor, { isLoading }] = useCreateColorMutation();

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof colorSchema>) => {
    try {
      await createColor(data);
      form.reset({ name: "" });
      setDialogOpen(false);
      toast.success("Color created successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="flex items-center gap-4 justify-between p-3 bg-white rounded">
        <p>Color</p>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button>Create color</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              {/* {editingCategory ? "Edit Category" : "Create New Category"} */}
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

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Submit"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
