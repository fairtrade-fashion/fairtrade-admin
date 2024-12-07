import React from "react";
import { Trash2 } from "lucide-react";
import { useDeleteProductMutation } from "@/domain/products/api/product.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/alert-dialog";
import { Button } from "@/components/button";
import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";
import { toast } from "sonner";

interface DeleteProductModalProps {
  productId: string;
  productName: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  productId,
  productName,
}) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handleError = useErrorHandler();

  const handleDelete = async () => {
    try {
      await deleteProduct({ id: productId })
        .unwrap()
        .then(() => {
          toast.success("Product Deleted Successfully");
        });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" className="flex-1">
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="font-semibold">{productName}</span>. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductModal;
