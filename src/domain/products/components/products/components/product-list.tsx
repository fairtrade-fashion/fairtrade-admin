// import { useState } from "react";
// import {
//   FetchProductResponse,
//   Product,
// } from "@/domain/products/models/products.model";
// import { Eye, Trash2 } from "lucide-react";

// import { Button } from "@/components/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/card";
// import { AspectRatio } from "@/components/aspect-ratio";
// import { Skeleton } from "@/components/skeleton";
// import EditProductModal from "./edit-product-modal";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/alert-dialog";
// import { toast } from "sonner";
// import { useDeleteProductMutation } from "@/domain/products/api/product.api";
// import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";

// interface ProductListProps {
//   products: FetchProductResponse;
//   onEditClick: (product: Product) => void;
//   onViewClick: (productId: string) => void;
//   Loading: boolean;
// }

// const ProductList: React.FC<ProductListProps> = ({
//   products,
//   onViewClick,
//   Loading,
// }) => {
//   const [selectedProduct, setSelectedProduct] = useState<{
//     id: string;
//     name: string;
//   } | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   if (Loading) return <ProductListSkeleton />;
//   if (!products || products.products.length === 0) {
//     return (
//       <div className="w-full text-center text-gray-500 text-xl font-semibold">
//         No Products Found
//       </div>
//     );
//   }
//   const [deleteProduct, { isLoading }] = useDeleteProductMutation();
//   const handleError = useErrorHandler();
//   const handleDeleteClick = (product: Product) => {
//     setSelectedProduct({ id: product.id, name: product.name });
//     setIsDeleteDialogOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!selectedProduct) return;

//     try {
//       await deleteProduct({ id: selectedProduct.id })
//         .unwrap()
//         .then(() => {
//           toast.success("Category Deleted Successfully");
//         });
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsDeleteDialogOpen(false);
//       setSelectedProduct(null);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {products.products.map((product) => (
//         <Card
//           key={product?.id}
//           className="overflow-hidden transition-all duration-300 hover:shadow-lg"
//         >
//           <CardHeader className="p-0">
//             <AspectRatio ratio={4 / 3}>
//               <img
//                 src={product?.images?.[0]?.url ?? "/placeholder.png"}
//                 alt={product?.name}
//                 loading="lazy"
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//               />
//             </AspectRatio>
//           </CardHeader>
//           <CardContent className="p-4">
//             <CardTitle className="text-lg font-semibold line-clamp-1 mb-2">
//               {product?.name}
//             </CardTitle>
//             <p className="text-primary font-mono text-lg font-bold">
//               ₦{product?.price.toLocaleString()}
//             </p>
//           </CardContent>
//           <CardFooter className="p-4 pt-0 gap-2 flex-wrap">
//             <Button
//               onClick={() => onViewClick(product.id)}
//               size="sm"
//               variant="outline"
//               className="flex-1"
//             >
//               <Eye className="w-4 h-4 mr-2" /> View
//             </Button>
//             <EditProductModal product={product} />
//             <Button
//               size="sm"
//               variant="destructive"
//               className="flex-1"
//               onClick={() => handleDeleteClick(product)}
//             >
//               <Trash2 className="w-4 h-4 mr-2" /> Delete
//             </Button>
//           </CardFooter>
//         </Card>
//       ))}

//       <AlertDialog
//         open={isDeleteDialogOpen}
//         onOpenChange={setIsDeleteDialogOpen}
//       >
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This will permanently delete{" "}
//               <span className="font-semibold">{selectedProduct?.name}</span>.
//               This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleConfirmDelete}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               {isLoading ? "Deleting..." : "Delete"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export const ProductListSkeleton: React.FC = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//     {[...Array(8)].map((_, index) => (
//       <Card key={index} className="overflow-hidden">
//         <CardHeader className="p-0">
//           <AspectRatio ratio={4 / 3}>
//             <Skeleton className="w-full h-full" />
//           </AspectRatio>
//         </CardHeader>
//         <CardContent className="p-4">
//           <Skeleton className="h-6 w-3/4 mb-2" />
//           <Skeleton className="h-5 w-1/2" />
//         </CardContent>
//         <CardFooter className="p-4 pt-0 gap-2">
//           <Skeleton className="h-9 flex-1" />
//           <Skeleton className="h-9 flex-1" />
//           <Skeleton className="h-9 flex-1" />
//         </CardFooter>
//       </Card>
//     ))}
//   </div>
// );

// export default ProductList;

import { useState } from "react";
import {
  FetchProductResponse,
  Product,
} from "@/domain/products/models/products.model";
import { Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { AspectRatio } from "@/components/aspect-ratio";
import { Skeleton } from "@/components/skeleton";
import EditProductModal from "./edit-product-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog";
import { toast } from "sonner";
import { useDeleteProductMutation } from "@/domain/products/api/product.api";
import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";

interface ProductListProps {
  products: FetchProductResponse;
  onEditClick: (product: Product) => void;
  onViewClick: (productId: string) => void;
  Loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onViewClick,
  Loading,
}) => {
  // Move all hooks to the top before any conditional returns
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handleError = useErrorHandler();

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct({ id: product.id, name: product.name });
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct({ id: selectedProduct.id })
        .unwrap()
        .then(() => {
          toast.success("Category Deleted Successfully");
        });
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      handleError(error);
    }
  };

  if (Loading) return <ProductListSkeleton />;

  if (!products || products.products.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 text-xl font-semibold">
        No Products Found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.products.map((product) => (
        <Card
          key={product?.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardHeader className="p-0">
            <AspectRatio ratio={4 / 3}>
              <img
                src={product?.images?.[0]?.url ?? "/placeholder.png"}
                alt={product?.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </AspectRatio>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold line-clamp-1 mb-2">
              {product?.name}
            </CardTitle>
            <p className="text-primary font-mono text-lg font-bold">
              ₦{product?.price.toLocaleString()}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 gap-2 flex-wrap">
            <Button
              onClick={() => onViewClick(product.id)}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" /> View
            </Button>
            <EditProductModal product={product} />
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => handleDeleteClick(product)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </CardFooter>
        </Card>
      ))}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold">{selectedProduct?.name}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const ProductListSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardHeader className="p-0">
          <AspectRatio ratio={4 / 3}>
            <Skeleton className="w-full h-full" />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </CardFooter>
      </Card>
    ))}
  </div>
);

export default ProductList;
