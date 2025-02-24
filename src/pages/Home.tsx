import { useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    axios.get<Product[]>("https://fakestoreapi.com/products")
      .then((res) => {
        dispatch({ type: "SET_PRODUCTS", payload: res.data });

        // Extract unique categories dynamically
        const categories = Array.from(new Set(res.data.map((product) => product.category)));
        dispatch({ type: "SET_CATEGORIES", payload: ["all", ...categories] });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [dispatch]);

  // Filter products based on selected category
  const filteredProducts = state.products.filter((product) =>
    state.selectedCategory === "all"
      ? true
      : product.category === state.selectedCategory
  );

  return (
    <div>
      <h1>Shop Products</h1>

      {/* Category Bar */}
      <select
        onChange={(e) => dispatch({ type: "SET_SELECTED_CATEGORY", payload: e.target.value })}
        value={state.selectedCategory}
      >
        {state.categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>

      {/* Display Products */}
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
