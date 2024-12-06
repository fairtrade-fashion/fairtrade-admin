export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  sizes: SizeProduct[];
  colors: ColorProduct[];
  imageUrls: string[];
}

export interface SizeProduct {
  id: string;
  stock: number;
}

export interface ColorProduct {
  id: string;
  stock: number;
}

export interface Image {
  imageUrl: string;
}

export interface ProductResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface FetchProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
  sizes: Size[];
  colors: Color[];
}

export interface Category {
  category_id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  createdAt: string;
}

export interface Size {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
}

export interface EditProduct {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category_id: string;
  sizes: string[];
  colors: string[];
}

export interface SingleProductRoot {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  images: SingleProductImage[];
  category: SingleProductCategory;
  sizes: SingleProductSize[];
  colors: SingleProductColor[];
}

export interface SingleProductImage {
  id: string;
  url: string;
}

export interface SingleProductCategory {
  id: string;
  name: string;
  parentId: any;
}

export interface SingleProductSize {
  id: string;
  stock: number;
  size: SingleProductSize2;
}

export interface SingleProductSize2 {
  id: string;
  name: string;
}

export interface SingleProductColor {
  id: string;
  stock: number;
  color: SingleProductColor2;
}

export interface SingleProductColor2 {
  id: string;
  name: string;
}
