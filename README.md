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

#### GET /api/usuarios
Obtener todos los usuarios

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/usuarios
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/usuarios');
const usuarios = await response.json();
```

#### GET /api/usuarios/:id
Obtener un usuario por ID

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/usuarios/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/usuarios/1');
const usuario = await response.json();
```

#### POST /api/usuarios
Crear un nuevo usuario (registro)

**Validaciones:**
- `nombre`, `apellido`, `email` y `password` son campos obligatorios
- El email debe tener un formato válido
- El email no puede estar duplicado
- La contraseña debe tener al menos 6 caracteres
- El `rol` es opcional y debe ser "Usuario" o "Administrador" (por defecto: "Usuario")

**Ejemplo con curl - Usuario normal:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "telefono": "+56912345678",
    "direccion": "Av. Principal 123",
    "region": "Región Metropolitana",
    "comuna": "Santiago",
    "rol": "Usuario"
  }'
```

**Ejemplo con curl - Usuario Administrador:**
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Admin",
    "apellido": "Sistema",
    "email": "admin@example.com",
    "password": "admin123",
    "telefono": "+56987654321",
    "direccion": "Av. Admin 456",
    "region": "Región Metropolitana",
    "comuna": "Santiago",
    "rol": "Administrador"
  }'
```

**Ejemplo con fetch:**
```javascript
// Usuario normal
const response = await fetch('http://localhost:3000/api/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@example.com',
    password: 'password123',
    telefono: '+56912345678',
    direccion: 'Av. Principal 123',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    rol: 'Usuario'
  })
});
const usuario = await response.json();

// Usuario Administrador
const responseAdmin = await fetch('http://localhost:3000/api/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Admin',
    apellido: 'Sistema',
    email: 'admin@example.com',
    password: 'admin123',
    telefono: '+56987654321',
    direccion: 'Av. Admin 456',
    region: 'Región Metropolitana',
    comuna: 'Santiago',
    rol: 'Administrador'
  })
});
const admin = await responseAdmin.json();
```

#### POST /api/usuarios/login
Iniciar sesión (login)

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/usuarios/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'juan@example.com',
    password: 'password123'
  })
});
const data = await response.json();
// Retorna: { message: 'Login exitoso', usuario: {...} }
```

#### PUT /api/usuarios/:id
Actualizar un usuario

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos",
    "telefono": "+56987654321",
    "direccion": "Av. Nueva 456"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/usuarios/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Juan Carlos',
    telefono: '+56987654321',
    direccion: 'Av. Nueva 456'
  })
});
const usuario = await response.json();
```

#### DELETE /api/usuarios/:id
Eliminar un usuario

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/usuarios/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/usuarios/1', {
  method: 'DELETE'
});
```

---

### Categorías

#### GET /api/categorias
Obtener todas las categorías

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/categorias
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/categorias');
const categorias = await response.json();
```

#### GET /api/categorias/:id
Obtener una categoría por ID

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/categorias/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/categorias/1');
const categoria = await response.json();
```

#### POST /api/categorias
Crear una nueva categoría

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/categorias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Rock",
    "descripcion": "Género musical de rock"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/categorias', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Rock',
    descripcion: 'Género musical de rock'
  })
});
const categoria = await response.json();
```

#### PUT /api/categorias/:id
Actualizar una categoría

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/api/categorias/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Rock Clásico",
    "descripcion": "Rock de los años 60-80"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/categorias/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Rock Clásico',
    descripcion: 'Rock de los años 60-80'
  })
});
const categoria = await response.json();
```

#### DELETE /api/categorias/:id
Eliminar una categoría

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/categorias/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/categorias/1', {
  method: 'DELETE'
});
```

---

### Productos

#### GET /api/productos
Obtener todos los productos (query opcional: `?activo=true` o `?activo=false`)

**Ejemplo con curl:**
```bash
# Todos los productos
curl -X GET http://localhost:3000/api/productos

# Solo productos activos
curl -X GET http://localhost:3000/api/productos?activo=true

# Solo productos inactivos
curl -X GET http://localhost:3000/api/productos?activo=false
```

**Ejemplo con fetch:**
```javascript
// Todos los productos
const response = await fetch('http://localhost:3000/api/productos');
const productos = await response.json();

// Solo productos activos
const responseActivos = await fetch('http://localhost:3000/api/productos?activo=true');
const productosActivos = await responseActivos.json();
```

#### GET /api/productos/:id
Obtener un producto por ID

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/productos/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/productos/1');
const producto = await response.json();
```

#### GET /api/productos/categoria/:categoriaId
Obtener productos por categoría

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/productos/categoria/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/productos/categoria/1');
const productos = await response.json();
```

#### GET /api/productos/buscar?artista=nombre
Buscar productos por artista

**Ejemplo con curl:**
```bash
curl -X GET "http://localhost:3000/api/productos/buscar?artista=Beatles"
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/productos/buscar?artista=Beatles');
const productos = await response.json();
```

#### POST /api/productos
Crear un nuevo producto

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Abbey Road",
    "artista": "The Beatles",
    "precio": 29990,
    "categoria_id": 1,
    "stock": 10,
    "descripcion": "Álbum clásico de The Beatles",
    "imagen": "https://example.com/abbey-road.jpg"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/productos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Abbey Road',
    artista: 'The Beatles',
    precio: 29990,
    categoria_id: 1,
    stock: 10,
    descripcion: 'Álbum clásico de The Beatles',
    imagen: 'https://example.com/abbey-road.jpg'
  })
});
const producto = await response.json();
```

#### PUT /api/productos/:id
Actualizar un producto

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 27990,
    "stock": 15,
    "activo": true
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/productos/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    precio: 27990,
    stock: 15,
    activo: true
  })
});
const producto = await response.json();
```

#### DELETE /api/productos/:id
Eliminar un producto

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/productos/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/productos/1', {
  method: 'DELETE'
});
```

---

### Blogs

#### GET /api/blogs
Obtener todos los blogs (query opcional: `?publicado=true` o `?publicado=false`)

**Ejemplo con curl:**
```bash
# Todos los blogs
curl -X GET http://localhost:3000/api/blogs

# Solo blogs publicados
curl -X GET http://localhost:3000/api/blogs?publicado=true

# Solo blogs no publicados
curl -X GET http://localhost:3000/api/blogs?publicado=false
```

**Ejemplo con fetch:**
```javascript
// Todos los blogs
const response = await fetch('http://localhost:3000/api/blogs');
const blogs = await response.json();

// Solo blogs publicados
const responsePublicados = await fetch('http://localhost:3000/api/blogs?publicado=true');
const blogsPublicados = await responsePublicados.json();
```

#### GET /api/blogs/:id
Obtener un blog por ID

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/blogs/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/blogs/1');
const blog = await response.json();
```

#### POST /api/blogs
Crear un nuevo blog

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Historia del Vinilo",
    "contenido": "El vinilo ha sido un formato musical icónico...",
    "excerpt": "Breve descripción del artículo",
    "imagen": "https://example.com/vinilo.jpg",
    "autor_id": 1,
    "publicado": true,
    "fecha_publicacion": "2024-01-15"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/blogs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titulo: 'Historia del Vinilo',
    contenido: 'El vinilo ha sido un formato musical icónico...',
    excerpt: 'Breve descripción del artículo',
    imagen: 'https://example.com/vinilo.jpg',
    autor_id: 1,
    publicado: true,
    fecha_publicacion: '2024-01-15'
  })
});
const blog = await response.json();
```

#### PUT /api/blogs/:id
Actualizar un blog

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/api/blogs/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Historia del Vinilo - Actualizado",
    "publicado": false
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/blogs/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    titulo: 'Historia del Vinilo - Actualizado',
    publicado: false
  })
});
const blog = await response.json();
```

#### DELETE /api/blogs/:id
Eliminar un blog

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/blogs/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/blogs/1', {
  method: 'DELETE'
});
```

---

### Carrito

#### GET /api/carrito/:usuarioId
Obtener el carrito de un usuario

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/carrito/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/carrito/1');
const carrito = await response.json();
// Retorna: { items: [...], total: 59980 }
```

#### POST /api/carrito/:usuarioId/:productoId
Agregar producto al carrito

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/carrito/1/1 \
  -H "Content-Type: application/json" \
  -d '{
    "cantidad": 2
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/carrito/1/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    cantidad: 2
  })
});
const item = await response.json();
```

#### PUT /api/carrito/:usuarioId/:productoId
Actualizar cantidad en el carrito

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/api/carrito/1/1 \
  -H "Content-Type: application/json" \
  -d '{
    "cantidad": 3
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/carrito/1/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    cantidad: 3
  })
});
const item = await response.json();
```

#### DELETE /api/carrito/:usuarioId/:productoId
Eliminar producto del carrito

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/carrito/1/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/carrito/1/1', {
  method: 'DELETE'
});
```

#### DELETE /api/carrito/:usuarioId
Vaciar el carrito

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/carrito/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/carrito/1', {
  method: 'DELETE'
});
```

---

### Órdenes

#### GET /api/ordenes
Obtener todas las órdenes (query opcional: `?usuarioId=1`)

**Ejemplo con curl:**
```bash
# Todas las órdenes
curl -X GET http://localhost:3000/api/ordenes

# Órdenes de un usuario específico
curl -X GET http://localhost:3000/api/ordenes?usuarioId=1
```

**Ejemplo con fetch:**
```javascript
// Todas las órdenes
const response = await fetch('http://localhost:3000/api/ordenes');
const ordenes = await response.json();

// Órdenes de un usuario específico
const responseUsuario = await fetch('http://localhost:3000/api/ordenes?usuarioId=1');
const ordenesUsuario = await responseUsuario.json();
```

#### GET /api/ordenes/:id
Obtener una orden por ID

**Ejemplo con curl:**
```bash
curl -X GET http://localhost:3000/api/ordenes/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/ordenes/1');
const orden = await response.json();
// Retorna la orden con sus items incluidos
```

#### POST /api/ordenes
Crear una nueva orden

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/ordenes \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 1,
    "total": 59980,
    "direccion_envio": "Av. Principal 123, Santiago",
    "telefono_contacto": "+56912345678",
    "notas": "Entregar en horario de oficina",
    "items": [
      {
        "producto_id": 1,
        "cantidad": 2,
        "precio_unitario": 29990,
        "subtotal": 59980
      }
    ]
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/ordenes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    usuario_id: 1,
    total: 59980,
    direccion_envio: 'Av. Principal 123, Santiago',
    telefono_contacto: '+56912345678',
    notas: 'Entregar en horario de oficina',
    items: [
      {
        producto_id: 1,
        cantidad: 2,
        precio_unitario: 29990,
        subtotal: 59980
      }
    ]
  })
});
const orden = await response.json();
```

#### POST /api/ordenes/carrito/:usuarioId
Crear orden desde el carrito

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/api/ordenes/carrito/1 \
  -H "Content-Type: application/json" \
  -d '{
    "direccion_envio": "Av. Principal 123, Santiago",
    "telefono_contacto": "+56912345678",
    "notas": "Entregar en horario de oficina"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/ordenes/carrito/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    direccion_envio: 'Av. Principal 123, Santiago',
    telefono_contacto: '+56912345678',
    notas: 'Entregar en horario de oficina'
  })
});
const orden = await response.json();
// El carrito se vacía automáticamente después de crear la orden
```

#### PUT /api/ordenes/:id
Actualizar una orden

**Ejemplo con curl:**
```bash
curl -X PUT http://localhost:3000/api/ordenes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "Enviado",
    "notas": "Orden enviada por correo"
  }'
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/ordenes/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    estado: 'Enviado',
    notas: 'Orden enviada por correo'
  })
});
const orden = await response.json();
```

#### DELETE /api/ordenes/:id
Eliminar una orden

**Ejemplo con curl:**
```bash
curl -X DELETE http://localhost:3000/api/ordenes/1
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/ordenes/1', {
  method: 'DELETE'
});
```

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