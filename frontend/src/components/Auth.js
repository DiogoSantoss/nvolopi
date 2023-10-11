import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
    const isLoggedIn = false;
    if (isLoggedIn) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default Auth;