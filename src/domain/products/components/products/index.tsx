import ProductsPage from "./components/products-page";
import CreateProducts from "./components/create-products";

const ProductTab: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <CreateProducts />
      <ProductsPage />
    </div>
  );
};

export default ProductTab;
