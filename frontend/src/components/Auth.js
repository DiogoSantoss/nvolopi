import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
    const isLoggedIn = true;
    if (isLoggedIn) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

export default Auth;