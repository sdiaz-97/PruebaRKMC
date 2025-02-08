# Proyecto Backend + Frontend con Docker

## Descripción

Este proyecto utiliza **Express.js** para el backend con **Prisma ORM** y **PostgreSQL** como base de datos.  
El frontend está desarrollado en **React** con **Ant Design**.  

Todo el entorno se gestiona a través de **Docker**, permitiendo su ejecución sin necesidad de instalar dependencias manualmente.  

Al iniciar la aplicación, se crea automáticamente un usuario administrador:

- **Correo**: `admin@hotmail.com`
- **Contraseña**: `admin`

El sistema implementa **JWT** para la autenticación y autorización de usuarios,  
diferenciando entre administradores y empleados para el acceso a rutas específicas.  

## Arquitectura del Proyecto

Se aplicó una arquitectura modular dentro de un monolito,  
siguiendo principios de clean architecturs.  
Los archivos están organizados en controladores, servicios, rutas y utilidades,  
garantizando un código limpio, mantenible y escalable.  

## Instalación y Ejecución

### Requisitos previos

- **Docker** y **Docker Compose**  

### Pasos para ejecutar la aplicación

1. **Clonar el repositorio**  
   ```sh
   git clone https://github.com/sdiaz-97/PruebaRKMC.git
   cd PruebaRKMC

2. **Clonar el repositorio**  
   ```sh
   docker-compose up --build -d

3. **La aplicación estará disponible en http://localhost:5173**  

# Query de las tablas:

CREATE DATABASE DBKRMC;

CREATE USER admin WITH ENCRYPTED PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE DBKRMC TO admin;

CREATE TABLE KrRole (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE KrUser (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    roleId INT NOT NULL,
    entryDate TIMESTAMP,
    salary INT,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES KrRole (id) ON DELETE CASCADE
);

CREATE TABLE KrRequest (
    id SERIAL PRIMARY KEY,
    employeeId INT NOT NULL,
    code VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    resume TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_employee FOREIGN KEY (employeeId) REFERENCES KrUser (id) ON DELETE CASCADE
);

INSERT INTO KrRole (id, name) VALUES ('Administrador'), ('Empleado') ON CONFLICT (id) DO NOTHING;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM KrUser WHERE email = 'admin@hotmail.com') THEN
        INSERT INTO KrUser (name, email, password, roleId, entryDate, salary, isActive) 
        VALUES ('Administrador', 'admin@hotmail.com', '$2b$10$zW2h4FsjsqfOrw9R91zJHuFcVp2KThEMexTbw8QuakZ.pH0BJdjxi', 1, NOW(), 5000, TRUE);
    END IF;
END $$;


## Mejores Prácticas

# Arquitectura Modular: Separación de responsabilidades en backend y frontend dentro de un monolito bien estructurado.

# Seguridad: Uso de JWT para autenticación y validación de roles.

# Docker: Simplifica la instalación y despliegue del proyecto.

# Prisma ORM: Evita inyecciones SQL y facilita la gestión de la base de datos.

# Uso de Ant Design: Diseño UI moderno y estructurado.

## Seguridad

# Autenticación y Autorización: Implementación de JWT para restringir accesos.

# Cifrado de Contraseñas: Se usa bcrypt para almacenar contraseñas de manera segura.

# Protección contra SQL Injection: Prisma ORM maneja consultas seguras automáticamente.

# Control de Acceso: Validaciones de roles para proteger endpoints.