import { State, Action } from "../types";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };

    case "DELETE_PRODUCT":
      const updatedProducts = state.products.filter((product) => product.id !== action.payload);

      // Update categories dynamically
      const updatedCategories = Array.from(new Set(updatedProducts.map((p) => p.category)));
      return {
        ...state,
        products: updatedProducts,
        categories: ["all", ...updatedCategories],
      };

    default:
      return state;
  }
};

export default reducer;
