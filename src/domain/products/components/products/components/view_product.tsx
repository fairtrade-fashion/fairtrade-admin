import { useAppDispatch, useAppSelector } from "@/app/app.hooks";
import { productPageClose } from "@/app/features/page_slider.slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Skeleton } from "@/components/skeleton";
import { useViewProductQuery } from "@/domain/products/api/product.api";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ViewProduct() {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(
    (state) => state.product.selectedProductId
  );

  const productId = selectedProduct;

  console.log("product view:: ", productId);

  const {
    data: product,
    isLoading,
    error,
  } = useViewProductQuery({ id: productId || "" });

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-6">
        <Card className="w-full">
          <CardContent className="p-6">
            <p className="text-center text-red-500">
              Failed to load product details.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full w-full ">
      <div className=" w-full rounded-lg bg-white p-4">
        <p
          onClick={() => dispatch(productPageClose())}
          className="flex w-full cursor-pointer items-center gap-2"
        >
          <span>
            <IoIosArrowRoundBack size={22} />
          </span>

          <span className=" text-lg font-bold"></span>
        </p>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {product.images.length > 0 ? (
                  <AspectRatio ratio={4 / 3}>
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                ) : null}

                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(1).map((image) => (
                      <AspectRatio ratio={1} key={image.id}>
                        <img
                          src={image.url}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                          loading="lazy"
                        />
                      </AspectRatio>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold uppercase">
                {product.name}
              </CardTitle>
              <p className="text-3xl font-mono font-bold text-primary">
                ₦{product.price.toLocaleString()}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="border border-gray-200 rounded p-2 w-fit">
                  {product.category.name}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Available Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <p
                      key={size.id}
                      className="border border-gray-200 rounded p-2"
                    >
                      {size.size.name} ({size.stock})
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <p
                      key={color.id}
                      className="border border-gray-200 rounded p-2"
                    >
                      {color.color.name} ({color.stock})
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Total Stock: {product.stock}</span>
                  <span>
                    Last Updated:{" "}
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">
            ₦{product.price.toLocaleString()}
          </p>
          <p className="mb-2">Stock: {product.stockQuantity}</p>
          <p className="mb-2">Category: {product.category.name}</p>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Sizes:</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size.size_id}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  {size.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Colors:</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span
                  key={color.color_id}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  {color.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Images:</h3>
            <div className="grid grid-cols-2 gap-4">
              {product.productImages.map((image) => (
                <img
                  key={image.image_id}
                  src={image.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export const ProductDetailsSkeleton = () => (
  <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <AspectRatio ratio={4 / 3}>
            <Skeleton className="w-full h-full rounded-lg" />
          </AspectRatio>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="w-full aspect-square rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-10 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);
