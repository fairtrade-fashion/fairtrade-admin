import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { useState } from "react";
import ProductForm from "./product-form";

export default function CreateProducts() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded p-4">
      <div className="flex items-center justify-between text-sm">
        <p>List of products</p>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create product</Button>
          </DialogTrigger>
          <DialogContent className="h-[80vh] max-w-xl w-full overflow-auto">
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
            </DialogHeader>
            <ProductForm onSuccess={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
