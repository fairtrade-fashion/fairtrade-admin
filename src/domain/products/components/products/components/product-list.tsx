import React from "react";
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

interface ProductListProps {
  products: FetchProductResponse;
  onEditClick: (product: Product) => void;
  onViewClick: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onViewClick }) => {
  if (!products || products.products.length === 0) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.products.map((product) => (
        <Card
          key={product?.product_id}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
          <CardHeader className="p-0">
            <AspectRatio ratio={4 / 3}>
              <img
                src={product?.images?.[0]?.url ?? "/placeholder.png"}
                alt={product?.name}
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
              onClick={() => onViewClick(product?.id)}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" /> View
            </Button>
            <EditProductModal product={product} />

            <Button size="sm" variant="destructive" className="flex-1">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const ProductListSkeleton: React.FC = () => (
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
