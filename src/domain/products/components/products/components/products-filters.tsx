// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { useAppDispatch, useAppSelector } from "@/app/app.hooks";
// import { useGetColorsQuery } from "@/domain/products/api/colors.api";
// import { useGetSizesQuery } from "@/domain/products/api/size.api";
// import { useGetCategoriesQuery } from "@/domain/categories/api/category.api";
// import {
//   setSearch,
//   setMinPrice,
//   setMaxPrice,
//   setColor,
//   setSize,
//   setSortBy,
//   setCategory,
//   resetFilters,
// } from "@/app/features/product.slice";

// const ProductFilters: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const filters = useAppSelector((state) => state.product);
//   const { data: colorData } = useGetColorsQuery();
//   const { data: sizeData } = useGetSizesQuery();
//   const { data: categoryData } = useGetCategoriesQuery();

//   return (
//     <aside className="w-full lg:w-[30%] xl:w-[20%] space-y-4">
//       <div>
//         <label htmlFor="search">Search products</label>
//         <input
//           id="search"
//           type="text"
//           value={filters.search}
//           onChange={(e) => dispatch(setSearch(e.target.value))}
//           placeholder="Search products"
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="minPrice">Min price</label>
//         <input
//           id="minPrice"
//           type="number"
//           value={filters.minPrice}
//           onChange={(e) => dispatch(setMinPrice(Number(e.target.value)))}
//           placeholder="Min Price"
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="maxPrice">Max price</label>
//         <input
//           id="maxPrice"
//           type="number"
//           value={filters.maxPrice}
//           onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
//           placeholder="Max Price"
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label htmlFor="color">Colors</label>
//         <select
//           id="color"
//           value={filters.color}
//           onChange={(e) => dispatch(setColor(e.target.value))}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">All Colors</option>
//           {colorData?.map((color) => (
//             <option key={color.color_id} value={color.color_id}>
//               {color.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="size">Sizes</label>
//         <select
//           id="size"
//           value={filters.size}
//           onChange={(e) => dispatch(setSize(e.target.value))}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">All Sizes</option>
//           {sizeData?.map((size) => (
//             <option key={size.size_id} value={size.size_id}>
//               {size.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label htmlFor="sortBy">Sort by</label>
//         <select
//           id="sortBy"
//           value={filters.sortBy}
//           onChange={(e) => dispatch(setSortBy(e.target.value as any))}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Default</option>
//           <option value="name">Name</option>
//           <option value="price">Price: Low to High</option>
//           <option value="-price">Price: High to Low</option>
//           <option value="createdAt">Date Created</option>
//         </select>
//       </div>

//       <div>
//         <label htmlFor="category">Category</label>
//         <select
//           id="category"
//           value={filters.category}
//           onChange={(e) => dispatch(setCategory(e.target.value))}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">All Categories</option>
//           {categoryData?.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         className="w-full p-2 bg-gray-600 text-white rounded"
//         onClick={() => dispatch(resetFilters())}
//       >
//         Reset Filters
//       </button>
//     </aside>
//   );
// };

// export default ProductFilters;

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/app.hooks";
// import { useGetColorsQuery } from "@/domain/products/api/colors.api";
// import { useGetSizesQuery } from "@/domain/products/api/size.api";
import { useGetCategoriesQuery } from "@/domain/categories/api/category.api";
import {
  setSearch,
  // setMinPrice,
  // setMaxPrice,
  // setColor,
  // setSize,
  setSortBy,
  setCategory,
  resetFilters,
} from "@/app/features/product.slice";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
// import { Slider } from "@/components/slider";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Separator } from "@/components/seperator";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const ProductFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.product);
  // const { data: colorData } = useGetColorsQuery();
  // const { data: sizeData } = useGetSizesQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //   },
  // };

  const containerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.3 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <Card className="w-full lg:w-[30%] xl:w-[20%]">
      <CardHeader
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="icon" className="lg:hidden">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>

      <AnimatePresence>
        {/* Always show on large screens, only show when isOpen on small screens */}
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="search">Search products</Label>
                <Input
                  id="search"
                  type="text"
                  value={filters.name}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                  placeholder="Search products"
                />
              </div>

              {/* <div>
                <Label>Price Range</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) =>
                      dispatch(setMinPrice(Number(e.target.value)))
                    }
                    placeholder="Min"
                    className="w-20"
                  />
                  <Input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      dispatch(setMaxPrice(Number(e.target.value)))
                    }
                    placeholder="Max"
                    className="w-20"
                  />
                </div>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => {
                    dispatch(setMinPrice(min));
                    dispatch(setMaxPrice(max));
                  }}
                  className="mt-4"
                />
              </div> */}

              <Separator />

              {/* <div>
                <Label htmlFor="color">Colors</Label>
                <Select
                  value={filters.color || "all-colors"}
                  onValueChange={(value) =>
                    dispatch(setColor(value === "all-colors" ? "" : value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-colors">All Colors</SelectItem>
                    {colorData?.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="size">Sizes</Label>
                <Select
                  value={filters.size || "all-sizes"}
                  onValueChange={(value) =>
                    dispatch(setSize(value === "all-sizes" ? "" : value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-sizes">All Sizes</SelectItem>
                    {sizeData?.map((size) => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              <div>
                <Label htmlFor="sortBy">Sort by</Label>
                <Select
                  value={filters.sortBy || "default"}
                  onValueChange={(value) =>
                    dispatch(
                      setSortBy(value === "default" ? "" : (value as any))
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="asc">Asc</SelectItem>
                    <SelectItem value="desc">Desc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={filters.category || "all-categories"}
                  onValueChange={(value) =>
                    dispatch(
                      setCategory(value === "all-categories" ? "" : value)
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">
                      All Categories
                    </SelectItem>
                    {categoryData?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button
                className="w-full"
                variant="outline"
                onClick={() => dispatch(resetFilters())}
              >
                Reset Filters
              </Button>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ProductFilters;
