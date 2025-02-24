import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch({ type: "SET_USER", payload: "admin" });
    navigate("/admin");
  };

  return <button onClick={handleLogin}>Login as Admin</button>;
};

export default Login;
