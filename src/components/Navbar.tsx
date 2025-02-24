import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Navbar = () => {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({state.cart.length})</Link>
      {state.user === "admin" && <Link to="/admin">Admin</Link>}
      <Link to="/login">Login</Link>
      {state.user && (
        <button onClick={() => dispatch({ type: "SET_USER", payload: null })}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
