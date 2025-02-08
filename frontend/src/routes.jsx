import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, lazy } from "react";
import { AuthContext } from "./context/AuthContext";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Requests = lazy(() => import("./pages/Requests"));
const Home = lazy(() => import("./pages/Home"));

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="requests" element={<Requests />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
