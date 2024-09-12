import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Input } from "@/components/input";
import { useCreateSizeMutation } from "@/domain/products/api/size.api";
import { sizeSchema } from "@/utils/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function CreateSize() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [createColor, { isLoading }] = useCreateSizeMutation();

  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof sizeSchema>) => {
    try {
      await createColor(data);
      form.reset({ name: "" });
      setDialogOpen(false);
      toast.success("Size created successfully");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main>
      <div className="flex items-center gap-4 justify-between p-3 bg-white rounded">
        <p>Size</p>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button>Create size</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create new size</DialogTitle>
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
