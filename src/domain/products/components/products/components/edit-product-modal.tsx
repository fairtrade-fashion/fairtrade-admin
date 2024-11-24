import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Product } from "@/domain/products/models/products.model";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import EditProductForm from "./edit-product-form";
import { ProductData } from "./types/product-types";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";
import { TriangleAlert } from "lucide-react";

export default function EditProductModal({ product }: { product: Product }) {
  const parsedProduct: ProductData = product as unknown as ProductData;
  const [isDialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="text-xs gap-1">
          <RiEdit2Fill /> <span className="hidden sm:inline">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] max-w-xl w-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <Alert>
            <TriangleAlert />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Editing a product will permanently delete all existing images
            </AlertDescription>
          </Alert>
        </DialogHeader>

        <EditProductForm
          productData={parsedProduct}
          onSucess={() => setDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
