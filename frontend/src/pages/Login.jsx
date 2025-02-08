import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, Input, Card, Form, Spin, message } from "antd";
import { apiService } from "../services/apiService";
import { API_ROUTES } from "../services/apiRoutes";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await apiService.post(API_ROUTES.auth.login, values);
      if (response.status == 200) {
        messageApi.success(response.message);
        localStorage.setItem("user", JSON.stringify(response.data));
        login(response.data);
        navigate("/dashboard");
      } else {
        messageApi.error(response.message);
      }
    } catch (error) {
      message.error(
        "Error en el inicio de sesión: " +
          (error?.message || "Intenta nuevamente")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {contextHolder}
      <Card title="Iniciar Sesión" style={styles.card}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Correo"
            rules={[
              { required: true, type: "email", message: "Correo inválido" },
            ]}
          >
            <Input placeholder="Ingresa tu correo" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: "La contraseña es requerida" }]}
          >
            <Input.Password placeholder="Ingresa tu contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? <Spin size="small" /> : "Iniciar Sesión"}
            </Button>
          </Form.Item>
        </Form>

      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f2f5",
  },
  card: {
    width: 400,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: 10,
    padding: 20,
  },
  registerSection: {
    marginTop: 16,
    textAlign: "center",
  },
  registerLink: {
    color: "#1890ff",
    cursor: "pointer",
  },
};

export default Login;
