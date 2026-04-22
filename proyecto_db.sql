CREATE DATABASE IF NOT EXISTS proyecto_db;
USE proyecto_db;

-- =========================
-- TABLA: categorias
-- =========================
CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(30) NOT NULL,
  descripcion VARCHAR(100)
) ENGINE=InnoDB;

-- =========================
-- TABLA: usuarios
-- =========================
CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol TINYINT NOT NULL
) ENGINE=InnoDB;

-- =========================
-- TABLA: productos
-- =========================
CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(100),
  precio_venta DECIMAL(10,2) NOT NULL,
  stock_actual INT NOT NULL DEFAULT 0,
  stock_minimo INT NOT NULL DEFAULT 0,
  estado BOOLEAN NOT NULL DEFAULT 1,
  id_categoria INT NOT NULL,

  FOREIGN KEY (id_categoria)
    REFERENCES categorias(id_categoria)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- TABLA: pedidos
-- =========================
CREATE TABLE pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  fecha DATE NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(20) NOT NULL,

  FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- =========================
-- TABLA: detalle_pedido
-- =========================
CREATE TABLE detalle_pedido (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  cantidad INT NOT NULL,
  fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
  precio_unitario DECIMAL(10,2) NOT NULL,
  sub_total DECIMAL(10,2) NOT NULL,
  id_producto INT NOT NULL,
  id_pedido INT NOT NULL,

  FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
    ON DELETE RESTRICT,

  FOREIGN KEY (id_pedido)
    REFERENCES pedidos(id_pedido)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- TABLA: comprobante
-- =========================
CREATE TABLE comprobantes (
  id_comprobante INT AUTO_INCREMENT PRIMARY KEY,
  numero_factura INT NOT NULL,
  metodo_pago VARCHAR(20) NOT NULL,
  impuestos DECIMAL(10,2) NOT NULL,
  fecha_emision DATE NOT NULL,
  id_pedido INT NOT NULL,

  FOREIGN KEY (id_pedido)
    REFERENCES pedidos(id_pedido)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================
-- TABLA: movimientos_inventario
-- =========================
CREATE TABLE movimientos_inventario (
  id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
  cantidad INT NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  cantidad_mov INT NOT NULL,
  fecha DATE NOT NULL,
  id_producto INT NOT NULL,
  id_usuario INT NOT NULL,

  FOREIGN KEY (id_producto)
    REFERENCES productos(id_producto)
    ON DELETE RESTRICT,

  FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario)
    ON DELETE RESTRICT
) ENGINE=InnoDB;