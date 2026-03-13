import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";

import PrivateRoutes from "./context/PrivateRoutes";
import { updateToken } from "./utils/auth";
import ForgotPasswordPage from "./pages/ForgotPassword";


function AppContent() {

  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.auth.tokens);

  useEffect(() => {

    if (!tokens) return;

    const interval = setInterval(() => {
      updateToken(dispatch);
    }, 600000);

    return () => clearInterval(interval);

  }, [tokens]);

  return (
    <Router>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPasswordPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<DashBoard />} />
        </Route>

      </Routes>

    </Router>
  );
}


export default function App() {
  return (
      <AppContent />
  );
}