import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const { Header, Footer, Content } = Layout;

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const isAdmin = user && user.userData.roleId === 1;
  const items = [
    ...(isAdmin
      ? [
          {
            key: "users",
            label: "Usuarios",
            onClick: () => navigate("/dashboard/users"),
          },
        ]
      : []),
    {
      key: "requests",
      label: "Solicitudes",
      onClick: () => navigate("/dashboard/requests"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button type="primary" danger onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Header>
      <Content style={{ padding: "20px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Creado por Sergio Diaz Toro
      </Footer>
    </Layout>
  );
};

export default Dashboard;
