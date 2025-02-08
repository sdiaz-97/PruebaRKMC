import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Spin,
  message,
  Popconfirm,
  Button,
  Modal,
  Form
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { apiService } from "../services/apiService";
import { API_ROUTES } from "../services/apiRoutes";
import dayjs from "dayjs";
import "dayjs/locale/es";

const { Search } = Input;

const Requests = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [form] = Form.useForm();
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.userData.roleId === 1;

  useEffect(() => {
    fetchRequests();
  }, [page, limit, search]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(
        `${API_ROUTES.requests}?page=${page}&limit=${limit}&search=${search}`
      );

      if (response.status === 200) {
        setRequests(response.data.requests);
        setTotal(response.data.total);
      } else {
        message.error("Error al cargar solicitudes: " + response.message);
      }
    } catch (error) {
      message.error(
        "Error en la solicitud: " + (error?.message || "Intenta nuevamente")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await apiService.delete(`${API_ROUTES.requests}/${id}`);
      if (response.status === 200) {
        messageApi.success("Solicitud eliminada correctamente");
        fetchRequests();
      } else {
        messageApi.error("Error al eliminar solicitud: " + response.message);
      }
    } catch (error) {
      messageApi.error("Error en la solicitud: " + error.message);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    form.resetFields();
    setModalVisible(false);
  };

  const handleCreateRequest = async (values) => {
    setLoadingRegister(true);
    try {
      const requestData = {
        ...values,
        employeeId: userData?.userData.id,
      };
      const response = await apiService.post(API_ROUTES.requests, requestData);
      if (response.status === 200) {
        messageApi.success("Solicitud creada exitosamente");
        handleCloseModal();
        fetchRequests();
      } else {
        messageApi.error("Error al crear solicitud: " + response.message);
      }
    } catch (error) {
      messageApi.error("Error en el registro: " + error.message);
    } finally {
      setLoadingRegister(false);
    }
  };

  const columns = [
    { title: "Código", dataIndex: "code", key: "code" },
    { title: "Descripción", dataIndex: "description", key: "description" },
    { title: "Resumen", dataIndex: "resume", key: "resume" },
    {
      title: "Fecha de Creación",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "N/A"),
    },
    ...(isAdmin
      ? [
          {
            title: "Usuario",
            dataIndex: ["employee", "email"],
            key: "adminData",
            render: (adminData) => adminData || "N/A",
          },
        ]
      : []),

    ...(isAdmin
      ? [
          {
            title: "Acciones",
            key: "actions",
            align: "center",
            render: (_, record) => (
              <Popconfirm
                title="¿Seguro que deseas eliminar esta solicitud?"
                onConfirm={() => handleDelete(record.id)}
                okText="Sí"
                cancelText="No"
              >
                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
              </Popconfirm>
            ),
          },
        ]
      : []),
  ];

  return (
    <div>
      {contextHolder}
      <h2>Gestión de Solicitudes</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Search
          placeholder="Buscar por código o descripción..."
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
          Crear Solicitud
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={requests}
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
        title="Crear Solicitud"
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreateRequest}>
          <Form.Item
            name="code"
            label="Código"
            rules={[{ required: true, message: "El código es obligatorio" }]}
          >
            <Input placeholder="Código de la solicitud" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descripción"
            rules={[
              { required: true, message: "La descripción es obligatoria" },
            ]}
          >
            <Input.TextArea placeholder="Descripción de la solicitud" />
          </Form.Item>

          <Form.Item
            name="resume"
            label="Resumen"
            rules={[{ required: true, message: "El resumen es obligatorio" }]}
          >
            <Input.TextArea placeholder="Resumen de la solicitud" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loadingRegister}
            >
              Crear Solicitud
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Requests;
