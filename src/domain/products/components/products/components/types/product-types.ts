export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  createdAt: string; // You might want to use Date type if you're parsing it into a Date object
  updatedAt: string; // Same as above
  category: Category;
  images: ImageData[];
  sizes: Size[];
  colors: Color[];
}

interface Category {
  id: string;
  name: string;
  parentId: string | null; // parentId can be null
}

export interface ImageData {
  id: string;
  url: string;
}

interface Size {
  id: string;
  stock: number;
  size: SizeDetails;
}

interface SizeDetails {
  id: string;
  name: string;
}

interface Color {
  id: string;
  stock: number;
  color: ColorDetails;
}

interface ColorDetails {
  id: string;
  name: string;
}
