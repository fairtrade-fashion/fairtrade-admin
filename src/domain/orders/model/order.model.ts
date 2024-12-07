export interface OrderRoot {
  map(
    arg0: (order: OrderRoot) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  length: number;
  id: string;
  userId: string;
  status: string;
  total: number;
  paymentReference: string;
  shippingAddressId: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress: OrderShippingAddress;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderShippingAddress {
  id: string;
  userId: string;
  streetAddress: string;
  fullName: string;
  city: string;
  state: string;
  phoneNumber: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

export interface SingleOrderRoot {
  id: string;
  userId: string;
  status: string;
  total: number;
  paymentReference: string;
  shippingAddressId: string;
  createdAt: string;
  updatedAt: string;
  items: SingleOrderItem[];
  user: SingleOrderUser;
}

export interface SingleOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: SingleOrderProduct;
}

export interface SingleOrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  averageRating: any;
}

export interface SingleOrderUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  googleId: any;
  createdAt: string;
  updatedAt: string;
}
