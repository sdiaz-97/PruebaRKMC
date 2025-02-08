import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Crear la instancia de Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response, // Si la respuesta es correcta, se retorna
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("No autorizado. Redirigiendo al home...");
      window.location.href = "/dashboard";
    }
    return Promise.reject(error);
  }
);

const getToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).tokenjwt : null;
};

const request = async (method, endpoint, data = null, headers = {}) => {
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let body = {
    method,
    url: endpoint,
    headers
  };

  if (data) {
    body.data = data;
  }

  try {
    const response = await api(body);
    return response.data;
  } catch (error) {
    console.error(
      `Error en ${method} ${endpoint}:`,
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Exportar los métodos de API
export const apiService = {
  get: (endpoint, headers = {}) => request("GET", endpoint, null, headers),
  post: (endpoint, data, headers = {}) =>
    request("POST", endpoint, data, headers),
  put: (endpoint, data, headers = {}) =>
    request("PUT", endpoint, data, headers),
  delete: (endpoint, headers = {}) =>
    request("DELETE", endpoint, null, headers),
  patch: (endpoint, data, headers = {}) =>
    request("PATCH", endpoint, data, headers),
};
