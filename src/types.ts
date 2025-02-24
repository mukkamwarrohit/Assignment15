export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type UserRole = "admin" | "customer" | null;

export interface State {
  products: Product[];
  cart: CartItem[];
  user: UserRole;
  categories: string[];
  selectedCategory: string;
}

export type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_USER"; payload: UserRole }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "EDIT_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_SELECTED_CATEGORY"; payload: string };
