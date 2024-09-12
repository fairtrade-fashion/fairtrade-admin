export interface CategoryResponse {
  category_id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPost {
  name: string;
  description: string;
}
