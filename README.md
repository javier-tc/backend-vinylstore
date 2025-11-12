# Backend VinylStore

Backend REST API para la tienda de vinilos VinylStore desarrollado con Node.js, Express y MySQL.

## Requisitos Previos

- Node.js (v18 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd backend-vinylstore
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura la base de datos:
   - Crea una base de datos MySQL
   - Ejecuta el script `database.sql` para crear las tablas y datos iniciales:
   ```bash
   mysql -u root -p < database.sql
   ```

4. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=vinylstore
   PORT=3000
   ```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

Para iniciar el servidor en modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints de la API

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario por ID
- `POST /api/usuarios` - Crear un nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar un usuario
- `DELETE /api/usuarios/:id` - Eliminar un usuario

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:id` - Obtener una categoría por ID
- `POST /api/categorias` - Crear una nueva categoría
- `PUT /api/categorias/:id` - Actualizar una categoría
- `DELETE /api/categorias/:id` - Eliminar una categoría

### Productos
- `GET /api/productos` - Obtener todos los productos (query: `?activo=true/false`)
- `GET /api/productos/:id` - Obtener un producto por ID
- `GET /api/productos/categoria/:categoriaId` - Obtener productos por categoría
- `GET /api/productos/buscar?artista=nombre` - Buscar productos por artista
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto
- `DELETE /api/productos/:id` - Eliminar un producto

### Blogs
- `GET /api/blogs` - Obtener todos los blogs (query: `?publicado=true/false`)
- `GET /api/blogs/:id` - Obtener un blog por ID
- `POST /api/blogs` - Crear un nuevo blog
- `PUT /api/blogs/:id` - Actualizar un blog
- `DELETE /api/blogs/:id` - Eliminar un blog

### Carrito
- `GET /api/carrito/:usuarioId` - Obtener el carrito de un usuario
- `POST /api/carrito/:usuarioId/:productoId` - Agregar producto al carrito (body: `{ cantidad: 1 }`)
- `PUT /api/carrito/:usuarioId/:productoId` - Actualizar cantidad en el carrito (body: `{ cantidad: 2 }`)
- `DELETE /api/carrito/:usuarioId/:productoId` - Eliminar producto del carrito
- `DELETE /api/carrito/:usuarioId` - Vaciar el carrito

### Órdenes
- `GET /api/ordenes` - Obtener todas las órdenes (query: `?usuarioId=1`)
- `GET /api/ordenes/:id` - Obtener una orden por ID
- `POST /api/ordenes` - Crear una nueva orden
- `POST /api/ordenes/carrito/:usuarioId` - Crear orden desde el carrito
- `PUT /api/ordenes/:id` - Actualizar una orden
- `DELETE /api/ordenes/:id` - Eliminar una orden

## Documentación API

La documentación interactiva de la API está disponible en:
```
http://localhost:3000/api-docs
```

## Estructura del Proyecto

```
backend-vinylstore/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de la base de datos
│   ├── models/                  # Modelos de datos
│   │   ├── Usuario.js
│   │   ├── Categoria.js
│   │   ├── Producto.js
│   │   ├── Blog.js
│   │   ├── Carrito.js
│   │   └── Orden.js
│   ├── controllers/             # Controladores
│   │   ├── usuarioController.js
│   │   ├── categoriaController.js
│   │   ├── productoController.js
│   │   ├── blogController.js
│   │   ├── carritoController.js
│   │   └── ordenController.js
│   └── routes/                  # Rutas
│       ├── users.js
│       ├── categorias.js
│       ├── productos.js
│       ├── blogs.js
│       ├── carrito.js
│       └── ordenes.js
├── database.sql                  # Script de base de datos
├── index.js                      # Punto de entrada
├── package.json
└── README.md
```

## Características

- ✅ CRUD completo para todas las entidades
- ✅ Manejo de transacciones para órdenes
- ✅ Validación de stock en carrito
- ✅ Hash de contraseñas con bcrypt
- ✅ Vistas de base de datos para consultas optimizadas
- ✅ Documentación Swagger
- ✅ CORS habilitado
- ✅ Manejo de errores

## Notas

- Las contraseñas se hashean automáticamente con bcrypt antes de guardarse
- El stock se actualiza automáticamente cuando se crea una orden
- Los triggers de la base de datos validan el stock antes de agregar al carrito
- Las vistas de base de datos optimizan las consultas de productos y órdenes



CREATE USER 'vinylstore_user'@'localhost' IDENTIFIED BY 'Vinylstore_password123';