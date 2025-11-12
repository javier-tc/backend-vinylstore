-- ============================================
-- ESQUEMA DE BASE DE DATOS PARA VINYLSTORE
-- ============================================

-- Eliminar base de datos si existe (solo para desarrollo)
-- DROP DATABASE IF EXISTS vinylstore;

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS vinylstore;
USE vinylstore;

-- ============================================
-- TABLA: usuarios
-- ============================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    region VARCHAR(100),
    comuna VARCHAR(100),
    rol ENUM('Usuario', 'Administrador') DEFAULT 'Usuario',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_rol (rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: categorias
-- ============================================
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: productos
-- ============================================
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    artista VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria_id INT,
    stock INT NOT NULL DEFAULT 0,
    descripcion TEXT,
    imagen VARCHAR(500),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
    INDEX idx_categoria (categoria_id),
    INDEX idx_artista (artista),
    INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: blogs
-- ============================================
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    excerpt VARCHAR(500),
    imagen VARCHAR(500),
    autor_id INT,
    publicado BOOLEAN DEFAULT FALSE,
    fecha_publicacion DATE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_publicado (publicado),
    INDEX idx_fecha_publicacion (fecha_publicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: carrito
-- ============================================
CREATE TABLE carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_producto (usuario_id, producto_id),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: ordenes
-- ============================================
CREATE TABLE ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    direccion_envio VARCHAR(255),
    telefono_contacto VARCHAR(20),
    notas TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
    INDEX idx_usuario (usuario_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha_creacion (fecha_creacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: orden_items
-- ============================================
CREATE TABLE orden_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT,
    INDEX idx_orden (orden_id),
    INDEX idx_producto (producto_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('rock', 'Música rock de todas las épocas'),
('pop', 'Música pop contemporánea y clásica'),
('jazz', 'Jazz clásico y moderno'),
('clasica', 'Música clásica y orquestal');

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (debe ser hasheada en producción)
INSERT INTO usuarios (nombre, apellido, email, password, rol) VALUES
('Administrador', 'Sistema', 'admin@vinylstore.com', '$2b$10$EjemploHashPasswordAdmin123', 'Administrador');

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, artista, precio, categoria_id, stock, descripcion, imagen) VALUES
('Led Zeppelin IV', 'Led Zeppelin', 25000.00, 1, 10, 'Uno de los álbumes más icónicos del rock clásico. Incluye clásicos como "Stairway to Heaven" y "Black Dog".', 'https://www.musicworld.cl/img/cms/cd%20vinilos/led%20zeppelin/d2IV.jpg'),
('Back To Black', 'Amy Winehouse', 30000.00, 2, 5, 'Álbum ganador del Grammy que marcó un antes y un después en la música soul contemporánea.', 'https://thesoundofvinyl.us/cdn/shop/products/Amy-Winehouse-Backl-To-Black-1LP-Vinyl.png?v=1661868011&width=1000'),
('Plastic Beach', 'Gorillaz', 28000.00, 2, 8, 'Tercer álbum de estudio de la banda virtual, con colaboraciones de artistas como Snoop Dogg y Lou Reed.', 'https://cdn.webshopapp.com/shops/13847/files/405053016/gorillaz-plastic-beach-vinyl-2lp.jpg'),
('Kind of Blue', 'Miles Davis', 35000.00, 3, 12, 'Considerado uno de los mejores álbumes de jazz de todos los tiempos. Grabado en 1959.', 'https://cdn.shopify.com/s/files/1/0550/6310/2021/products/kind-of-blue-miles-davis-vinyl-record.jpg'),
('The Four Seasons', 'Antonio Vivaldi', 20000.00, 4, 15, 'Obra maestra del barroco italiano, una de las composiciones más reconocidas de la música clásica.', 'https://m.media-amazon.com/images/I/81QZQZQZQZ.jpg');

-- Insertar blogs de ejemplo
INSERT INTO blogs (titulo, contenido, excerpt, imagen, autor_id, publicado, fecha_publicacion) VALUES
('La Historia del Vinilo', 
'El vinilo revolucionó la industria musical en el siglo XX. Desde su invención hasta su resurgimiento en la era digital, el vinilo ha mantenido su lugar especial en el corazón de los amantes de la música. Este formato analógico ofrece una calidad de sonido única que muchos audiófilos consideran superior a los formatos digitales modernos.',
'Descubre cómo el vinilo revolucionó la música y por qué sigue siendo relevante hoy en día.',
'https://via.placeholder.com/300x200',
1,
TRUE,
'2024-01-15'),
('Cuidado y Mantenimiento', 
'Aprende a mantener tus vinilos en perfecto estado. El cuidado adecuado puede extender significativamente la vida útil de tus discos. Desde la limpieza hasta el almacenamiento, cada detalle cuenta para preservar la calidad del sonido.',
'Aprende a mantener tus vinilos en perfecto estado con estos consejos profesionales.',
'https://via.placeholder.com/300x200',
1,
TRUE,
'2024-01-10');

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista para productos con información de categoría
CREATE VIEW vista_productos_completos AS
SELECT 
    p.id,
    p.nombre,
    p.artista,
    p.precio,
    c.nombre AS categoria,
    p.stock,
    p.descripcion,
    p.imagen,
    p.activo,
    p.fecha_creacion,
    p.fecha_actualizacion
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id;

-- Vista para órdenes con información del usuario
CREATE VIEW vista_ordenes_completas AS
SELECT 
    o.id,
    o.usuario_id,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_usuario,
    u.email AS email_usuario,
    o.total,
    o.estado,
    o.direccion_envio,
    o.telefono_contacto,
    o.fecha_creacion,
    o.fecha_actualizacion
FROM ordenes o
INNER JOIN usuarios u ON o.usuario_id = u.id;

-- ============================================
-- PROCEDIMIENTOS ALMACENADOS ÚTILES
-- ============================================

-- Procedimiento para actualizar stock después de una orden
DELIMITER //
CREATE PROCEDURE actualizar_stock_orden(IN orden_id_param INT)
BEGIN
    UPDATE productos p
    INNER JOIN orden_items oi ON p.id = oi.producto_id
    SET p.stock = p.stock - oi.cantidad
    WHERE oi.orden_id = orden_id_param;
END //
DELIMITER ;

-- Procedimiento para obtener el total del carrito de un usuario
DELIMITER //
CREATE PROCEDURE obtener_total_carrito(IN usuario_id_param INT)
BEGIN
    SELECT 
        SUM(p.precio * c.cantidad) AS total
    FROM carrito c
    INNER JOIN productos p ON c.producto_id = p.id
    WHERE c.usuario_id = usuario_id_param;
END //
DELIMITER ;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger para validar stock antes de insertar en carrito
DELIMITER //
CREATE TRIGGER validar_stock_carrito
BEFORE INSERT ON carrito
FOR EACH ROW
BEGIN
    DECLARE stock_disponible INT;
    SELECT stock INTO stock_disponible FROM productos WHERE id = NEW.producto_id;
    IF stock_disponible < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuficiente para este producto';
    END IF;
END //
DELIMITER ;

-- Trigger para actualizar stock cuando se crea una orden
DELIMITER //
CREATE TRIGGER actualizar_stock_orden_trigger
AFTER INSERT ON orden_items
FOR EACH ROW
BEGIN
    UPDATE productos
    SET stock = stock - NEW.cantidad
    WHERE id = NEW.producto_id;
END //
DELIMITER ;

