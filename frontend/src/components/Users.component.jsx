import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Spin,
  message,
  Popconfirm,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { apiService } from "../services/apiService";
import { API_ROUTES } from "../services/apiRoutes";
import dayjs from "dayjs";
import "dayjs/locale/es";
import currencyFormatter from "currency-formatter";

const { Search } = Input;
const { Option } = Select;

const Users = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(
        `${API_ROUTES.users}?page=${page}&limit=${limit}&search=${search}`
      );

      if (response.status === 200) {
        setUsers(response.data.users);
        setTotal(response.data.total);
      } else {
        message.error("Error al cargar usuarios: " + response.message);
      }
    } catch (error) {
      message.error(
        "Error en la solicitud: " + (error?.message || "Intenta nuevamente")
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await apiService.get(API_ROUTES.roles);
      if (response.status === 200) {
        setRoles(response.data);
      } else {
        message.error("Error al obtener los roles: " + response.message);
      }
    } catch (error) {
      message.error("Error al obtener los roles: " + error.message);
    } finally {
      setLoadingRoles(false);
    }
  };

  const handleDelete = async (email) => {
    try {
      const response = await apiService.delete(`${API_ROUTES.users}/${email}`);
      if (response.status === 200) {
        messageApi.success("Usuario eliminado correctamente");
        fetchUsers();
      } else {
        messageApi.error("Error al eliminar usuario: " + response.message);
      }
    } catch (error) {
      messageApi.error("Error en la solicitud: " + error.message);
    }
  };

  const handleOpenModal = () => {
    fetchRoles();
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setModalVisible(false);
  };

  const handleCreateUser = async (values) => {
    setLoadingRegister(true);
    try {
      const response = await apiService.post(API_ROUTES.auth.register, values);
      if (response.status === 200) {
        messageApi.success("Usuario creado exitosamente");
        handleCloseModal();
        fetchUsers();
      } else {
        messageApi.error("Error al crear usuario: " + response.message);
      }
    } catch (error) {
      messageApi.error("Error en el registro: " + error.message);
    } finally {
      setLoadingRegister(false);
    }
  };

  const columns = [
    { title: "Nombre", dataIndex: "name", key: "name" },
    { title: "Correo", dataIndex: "email", key: "email" },
    { title: "Rol", dataIndex: ["role", "name"], key: "role" },
    {
      title: "Salario",
      dataIndex: "salary",
      key: "salary",
      render: (salary) =>
        salary ? currencyFormatter.format(salary, { code: "USD" }) : "N/A",
    },

    {
      title: "Fecha de Ingreso",
      dataIndex: "entryDate",
      key: "entryDate",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "N/A"),
    },

    {
      title: "Acciones",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Popconfirm
          title="¿Seguro que deseas eliminar este usuario?"
          onConfirm={() => handleDelete(record.email)}
          okText="Sí"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <h2>Gestión de Usuarios</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Search
          placeholder="Buscar por nombre o correo..."
          allowClear
          enterButton="Buscar"
          size="large"
          onSearch={(value) => {
            setPage(1);
            setSearch(value);
          }}
          style={{ width: 500 }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
        >
          Crear Usuario
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showSizeChanger: true,
            onChange: (newPage, newLimit) => {
              setPage(newPage);
              setLimit(newLimit);
            },
          }}
          rowKey="id"
        />
      )}

      <Modal
        title="Crear Usuario"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreateUser}>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input placeholder="Nombre del usuario" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Correo"
            rules={[
              {
                required: true,
                type: "email",
                message: "Ingresa un correo válido",
              },
            ]}
          >
            <Input placeholder="Correo del usuario" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "La contraseña es obligatoria" },
            ]}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>

          <Form.Item
            name="entryDate"
            label="Fecha de Ingreso"
            rules={[
              { required: true, message: "La fecha de ingreso es obligatoria" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="salary"
            label="Salario"
            rules={[{ required: true, message: "El salario es obligatorio" }]}
          >
            <InputNumber style={{ width: "100%" }} min={1} defaultValue={1} />
          </Form.Item>

          <Form.Item
            name="roleId"
            label="Rol"
            rules={[{ required: true, message: "Selecciona un rol" }]}
          >
            <Select placeholder="Selecciona un rol" loading={loadingRoles}>
              {roles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loadingRegister}
            >
              Crear Usuario
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
