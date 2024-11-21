export interface CategoryResponse {
  id: string;
  name: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  parent?: Parent;
  children: Children[];
}

export interface Parent {
  id: string;
  name: string;
  parentId: any;
  createdAt: string;
  updatedAt: string;
}

export interface Children {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPost {
  name: string;
  description: string;
}
