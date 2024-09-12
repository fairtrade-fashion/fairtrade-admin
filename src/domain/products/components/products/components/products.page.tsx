import { useAppDispatch, useAppSelector } from "@/app/app.hooks";
import {
  resetFilters,
  setCategory,
  setColor,
  setLimit,
  setMaxPrice,
  setMinPrice,
  setPage,
  setSearch,
  setSelectedProduct,
  setSize,
  setSortBy,
} from "@/app/features/product.slice";
import { useGetCategoriesQuery } from "@/domain/categories/api/category.api";
import { useGetColorsQuery } from "@/domain/products/api/colors.api";
import {
  useEditProductMutation,
  useViewProductQuery,
  useFetchProductsQuery,
} from "@/domain/products/api/product.api";
import { useGetSizesQuery } from "@/domain/products/api/size.api";
import { EditProduct, Product } from "@/domain/products/models/products.model";
import { useCallback, useEffect, useMemo, useState } from "react";
import {  FaEye } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";
import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";
import { EditProductModal } from "./edit_product.modal";
import {
  View_ProductPage,
} from "@/app/features/page_slider.slice";

export default function ProductsPage() {
  const filterState = useAppSelector((state) => state.product);
  const { data: products } = useFetchProductsQuery({
    search: filterState.search,
    page: filterState.page,
    limit: filterState.limit,
    minPrice: filterState.minPrice,
    maxPrice: filterState.maxPrice,
    color: filterState.color,
    size: filterState.size,
    sortBy: filterState.sortBy,
    category: filterState.category,
  });
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.product);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { data: sizeData } = useGetSizesQuery();
  const { data: colorData } = useGetColorsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const [EditProduct] = useEditProductMutation();
  const handleError = useErrorHandler();

  // New state to store the ID of the product being viewed
  const [viewProductId, setViewProductId] = useState<string | null>(null);

  // New query hook to fetch the full product details
  const { data: viewProductData } = useViewProductQuery(
    { id: viewProductId || "" },
    { skip: !viewProductId }
  );

  const sizeOptions = useMemo(
    () =>
      sizeData?.map((size) => ({
        value: size.size_id,
        label: size.name,
      })) || [],
    [sizeData]
  );

  const colorOptions = useMemo(
    () =>
      colorData?.map((color) => ({
        value: color.color_id,
        label: color.name,
      })) || [],
    [colorData]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLimit(Number(e.target.value)));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMinPrice(Number(e.target.value)));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMaxPrice(Number(e.target.value)));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setColor(e.target.value));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSize(e.target.value));
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortValue = e.target.value;
    if (sortValue === "price_asc") {
      sortValue = "price";
    } else if (sortValue === "price_desc") {
      sortValue = "-price";
    }
    dispatch(setSortBy(sortValue as "name" | "price" | "createdAt"));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleEditClick = useCallback((product: Product) => {
    setEditingProduct(product);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditingProduct(null);
  }, []);

  const handleEditSubmit = useCallback(
    async (data: EditProduct) => {
      if (editingProduct) {
        try {
          await EditProduct({ id: editingProduct.product_id, data }).unwrap();
          toast.success("Product updated successfully");
          setEditingProduct(null);
        } catch (error) {
          handleError(error);
        }
      }
    },
    [editingProduct, EditProduct, handleError]
  );

  const handleViewClick = useCallback(
    (productId: string) => {
      setViewProductId(productId);
      dispatch(View_ProductPage());
    },
    [dispatch]
  );

  // Effect to update the selected product in the store when the full data is fetched
  useEffect(() => {
    if (viewProductData) {
      dispatch(setSelectedProduct(viewProductData));
    }
  }, [viewProductData, dispatch]);
  // const handleDeleteClick = useCallback(
  //   async (productId: string) => {
  //     try {
  //       await deleteProduct(productId);
  //       toast.success("Product deleted successfully");
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   },
  //   [deleteProduct, handleError]
  // );

  const totalPages = Math.ceil((products?.total || 0) / filters.limit);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 mt-5 w-full">
      <aside className="w-full lg:w-[30%] xl:w-[20%] text-xs flex lg:flex-col items-end overflow-auto gap-2 ">
        <div className="min-w-[150px] lg:w-full">
          <label htmlFor="" className="ml-2">
            Search products
          </label>
          <input
            className="outline-none p-2 border w-full rounded"
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search products"
          />
        </div>
        <div className="min-w-[150px] lg:w-full">
          <label htmlFor="" className="ml-2">
            Min price
          </label>
          <input
            className="outline-none p-2 border w-full rounded"
            type="number"
            value={filters.minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min Price"
          />
        </div>
        <div className="min-w-[150px] lg:w-full">
          <label htmlFor="" className="ml-2">
            Max price
          </label>
          <input
            className="outline-none p-2 border w-full rounded"
            type="number"
            value={filters.maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max Price"
          />
        </div>
        <div className="min-w-[150px] lg:w-full">
          <label htmlFor="" className="ml-2">
            Colors
          </label>
          <select
            value={filters.color}
            onChange={handleColorChange}
            className="min-w-[150px] lg:w-full border rounded p-2 outline-none"
          >
            <option value=""></option>
            {colorData?.map((color) => (
              <option key={color.color_id} value={color.color_id}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[150px] lg:w-full">
          <label htmlFor="" className="ml-2">
            Sizes
          </label>
          <select
            value={filters.size}
            onChange={handleSizeChange}
            className="min-w-[150px] lg:w-full border rounded p-2 outline-none"
          >
            <option value=""> </option>
            {sizeData?.map((size) => (
              <option key={size.size_id} value={size.size_id}>
                {size.name}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[150px] lg:w-full">
          <label htmlFor="" className="ml-2">
            Sort by
          </label>
          <select
            value={filters.sortBy}
            onChange={handleSortByChange}
            className="min-w-[150px] lg:w-full border rounded p-2 outline-none"
          >
            <option value=""></option>
            <option value="name">Name</option>
            <option value="price">Price: Low to High</option>
            <option value="price">Price: High to Low</option>
            <option value="createdAt">Date Created</option>
          </select>
        </div>
        <div className="min-w-[150px] lg:w-full">
          <label htmlFor="" className="ml-2">
            Max price
          </label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="min-w-[150px] lg:w-full border rounded p-2"
          >
            <option value="">All Categories</option>
            {categoryData?.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full border rounded p-2 bg-gray-600 text-white min-w-[150px] lg:w-full"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </aside>

      <aside className="w-full h-full rounded-lg">
        <div className="min-h-[50vh] grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {products?.products.map((product) => (
            <div
              key={product.product_id}
              className="mx-auto overflow-hidden rounded-lg bg-white drop-shadow-lg h-fit"
            >
              <img
                src='https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" class="aspect-video w-full object-cover'
                className="aspect-video w-full h-full object-cover"
                alt=""
              />
              <div className="lg:p-4 p-2 text-[10px]">
                <h3 className="text-[10px] lg:text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mb-1  text-primary-500">
                  ₦{product.price.toLocaleString()}
                </p>

                <div className="mt-4 flex gap-2 items-center">
                  <button
                    onClick={() => handleViewClick(product.product_id)}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                  >
                    <span className="hidden lg:block">View</span>
                    <span>
                      <FaEye />
                    </span>
                  </button>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                  >
                    <span className="hidden lg:block">Edit</span>
                    <span>
                      <RiEdit2Fill />
                    </span>
                  </button>
                  <button className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                    <span className="hidden lg:block">Delete</span>
                    <span>
                      <MdDeleteForever />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-5 items-center justify-center mt-10">
          <button
            className="text-white bg-black/70 p-2 text-xs rounded"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
          >
            Previous
          </button>
          <span>
            {filters.page} of {totalPages}
          </span>
          <button
            className="text-white bg-black/70 p-2 text-xs rounded"
            onClick={() => handlePageChange(filters.page + 1)}
          >
            Next
          </button>
          <select
            value={filters.limit}
            onChange={handleLimitChange}
            className="border rounded p-1 outline-none"
          >
            <option value="5">5 </option>
            <option value="10">10 </option>
            <option value="20">20 </option>
            <option value="50">50 </option>
          </select>
        </div>
      </aside>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={handleCloseEditModal}
          onSubmit={handleEditSubmit}
          sizeOptions={sizeOptions}
          colorOptions={colorOptions}
        />
      )}
    </div>
  );
}
