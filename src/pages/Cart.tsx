import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Cart = () => {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <div>
      <h2>Shopping Cart</h2>

      {state.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        state.cart.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} width="50" />
            <h4>{item.title}</h4>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
