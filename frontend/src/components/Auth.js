import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../context/Auth";

const Auth = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
