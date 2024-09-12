import { useAppDispatch, useAppSelector } from "@/app/app.hooks";
import { productPageClose } from "@/app/features/page_slider.slice";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ViewProduct() {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(
    (state) => state.product.selectedProduct
  );

  const product = selectedProduct;

  console.log("product view:: ", product);

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
