import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {

    const tokens = useSelector((state) => state.auth.tokens);

    return tokens ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;