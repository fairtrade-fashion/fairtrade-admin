export interface TotalSalesRoot {
  total_sales: number;
}

export interface TotalOrderRoot {
  total_orders: number;
}

export interface TotalCustomersRoot {
  total_customers: number;
}

export interface TotalProductsRoot {
  total_products: number;
}

export type TopProduct = {
  id: string;
  name: string;
};

export type TopSellingProduct = {
  _sum: {
    quantity: number;
    price: number;
  };
  productId: string;
  product: TopProduct;
};
