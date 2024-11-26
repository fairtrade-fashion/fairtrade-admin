/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/app.hooks";
import { useFetchProductsQuery } from "@/domain/products/api/product.api";
import { Product } from "@/domain/products/models/products.model";
import { View_ProductPage } from "@/app/features/page_slider.slice";
import { setPage, setLimit } from "@/app/features/product.slice";
import ProductFilters from "./products-filters";
import ProductList from "./product-list";
import Pagination from "./pagination";
import EditProductModal from "./edit-product-modal";
// import { EditProductModal } from "./edit-product-modal";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.product);
  const { data: products } = useFetchProductsQuery(filterState);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [, setViewProductId] = useState<string | null>(null);

  const handleEditClick = useCallback((product: Product) => {
    setEditingProduct(product);
  }, []);

  const handleViewClick = useCallback(
    (productId: string) => {
      setViewProductId(productId);
      dispatch(View_ProductPage());
    },
    [dispatch]
  );

  if (!products) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 mt-5 w-full">
      <ProductFilters />
      <div className="w-full">
        <ProductList
          products={products}
          onEditClick={handleEditClick}
          onViewClick={handleViewClick}
        />
        <Pagination
          currentPage={filterState.page}
          totalPages={Math.ceil((products?.total || 0) / filterState.limit)}
          onPageChange={(page) => dispatch(setPage(page))}
          onLimitChange={(limit) => dispatch(setLimit(Number(limit)))}
        />
      </div>
      {editingProduct && <EditProductModal product={editingProduct} />}
    </div>
  );
};

export default ProductsPage;
