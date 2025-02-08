import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
