import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, lazy } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../components/Users.component"));
const Requests = lazy(() => import("../components/Requests.component"));
const Home = lazy(() => import("../pages/Home"));

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
