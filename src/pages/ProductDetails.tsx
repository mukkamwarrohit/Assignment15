import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Product } from "../types";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // ✅ Define the type of ID
  const { state, dispatch } = useContext(GlobalContext);

  const product: Product | undefined = state.products.find((p) => p.id === Number(id));

  return product ? (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="150" />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
        Add to Cart
      </button>
    </div>
  ) : (
    <p>Product not found</p>
  );
};

export default ProductDetails;
