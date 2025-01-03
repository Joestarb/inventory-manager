-- Crear la base de datos
CREATE DATABASE pos_system;
USE pos_system;

-- Tabla: Usuarios
CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       email VARCHAR(150) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT NULL,
                       deleted INT NOT NULL DEFAULT 0
);

-- Tabla: Categorías de productos
CREATE TABLE categories (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(100) NOT NULL,
                            description TEXT NULL,
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            updated_at DATETIME DEFAULT NULL,
                            deleted INT NOT NULL DEFAULT 0
);

-- Tabla: Productos
CREATE TABLE products (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          description TEXT NULL,
                          purchase_price DECIMAL(10,2) NOT NULL,
                          sale_price DECIMAL(10,2) NOT NULL,
                          stock INT NOT NULL DEFAULT 0,
                          category_id INT NOT NULL,
                          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME DEFAULT NULL,
                          deleted INT NOT NULL DEFAULT 0 ,
                          FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla: Ventas
CREATE TABLE sales (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       user_id INT NOT NULL,
                       total_amount DECIMAL(10,2) NOT NULL,
                       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME DEFAULT NULL,
                       deleted INT NOT NULL DEFAULT 0 ,
                       FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla: Detalles de la venta
CREATE TABLE sale_items (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            sale_id INT NOT NULL,
                            product_id INT NOT NULL,
                            quantity INT NOT NULL,
                            unit_price DECIMAL(10,2) NOT NULL,
                            subtotal DECIMAL(10,2) AS (quantity * unit_price) STORED,--en cuenta que el subtotal es el resultado de la multiplicación de la cantidad por el precio unitario
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            updated_at DATETIME DEFAULT NULL,
                            deleted INT NOT NULL DEFAULT 0 ,
                            FOREIGN KEY (sale_id) REFERENCES sales(id),
                            FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla: Proveedores
CREATE TABLE suppliers (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(100) NOT NULL,
                           email VARCHAR(150) NULL,
                           phone VARCHAR(15) NULL,
                           address TEXT NULL,
                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                           updated_at DATETIME DEFAULT NULL,
                           deleted INT NOT NULL DEFAULT 0
);

-- Tabla: Compras
CREATE TABLE purchases (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           supplier_id INT NOT NULL,
                           total_amount DECIMAL(10,2) NOT NULL,
                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                           updated_at DATETIME DEFAULT NULL,
                           deleted INT NOT NULL DEFAULT 0 ,
                           FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Tabla: Detalles de la compra
CREATE TABLE purchase_items (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                purchase_id INT NOT NULL,
                                product_id INT NOT NULL,
                                quantity INT NOT NULL,
                                unit_price DECIMAL(10,2) NOT NULL,
                                subtotal DECIMAL(10,2) AS (quantity * unit_price) STORED,-- en cuenta que el subtotal es el resultado de la multiplicación de la cantidad por el precio unitario
                                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                updated_at DATETIME DEFAULT NULL,
                                deleted INT NOT NULL DEFAULT 0 ,
                                FOREIGN KEY (purchase_id) REFERENCES purchases(id),
                                FOREIGN KEY (product_id) REFERENCES products(id)
);


ALTER TABLE products ADD COLUMN product_number varchar(50) NOT NULL;
