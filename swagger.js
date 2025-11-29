import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
    title: "API Vinylstore",
    description: "Documentación de la API de Vinylstore",
    version: "1.0.0"
  },
  host: "localhost:3000",
  schemes: ["http"],
  definitions: {
    Usuario: {
      type: "object",
      required: ["nombre", "apellido", "email", "password"],
      properties: {
        nombre: { type: "string", example: "Juan" },
        apellido: { type: "string", example: "Pérez" },
        email: { type: "string", example: "juan@example.com" },
        password: { type: "string", example: "password123" },
        telefono: { type: "string", example: "+56912345678" },
        direccion: { type: "string", example: "Av. Principal 123" },
        region: { type: "string", example: "Región Metropolitana" },
        comuna: { type: "string", example: "Santiago" },
        rol: { type: "string", enum: ["Usuario", "Administrador"], example: "Usuario" }
      }
    },
    UsuarioLogin: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", example: "juan@example.com" },
        password: { type: "string", example: "password123" }
      }
    },
    Categoria: {
      type: "object",
      required: ["nombre"],
      properties: {
        nombre: { type: "string", example: "Rock" },
        descripcion: { type: "string", example: "Género musical de rock" }
      }
    },
    Producto: {
      type: "object",
      required: ["nombre", "artista", "precio"],
      properties: {
        nombre: { type: "string", example: "Abbey Road" },
        artista: { type: "string", example: "The Beatles" },
        precio: { type: "number", example: 29990 },
        categoria_id: { type: "integer", example: 1 },
        stock: { type: "integer", example: 10 },
        descripcion: { type: "string", example: "Álbum clásico de The Beatles" },
        imagen: { type: "string", example: "https://example.com/abbey-road.jpg" },
        activo: { type: "boolean", example: true }
      }
    },
    Blog: {
      type: "object",
      required: ["titulo", "contenido"],
      properties: {
        titulo: { type: "string", example: "Historia del Vinilo" },
        contenido: { type: "string", example: "El vinilo ha sido un formato musical icónico..." },
        excerpt: { type: "string", example: "Breve descripción del artículo" },
        imagen: { type: "string", example: "https://example.com/vinilo.jpg" },
        autor_id: { type: "integer", example: 1 },
        publicado: { type: "boolean", example: true },
        fecha_publicacion: { type: "string", format: "date", example: "2024-01-15" }
      }
    },
    CarritoItem: {
      type: "object",
      required: ["cantidad"],
      properties: {
        cantidad: { type: "integer", example: 2 }
      }
    },
    Orden: {
      type: "object",
      required: ["usuario_id", "total", "items"],
      properties: {
        usuario_id: { type: "integer", example: 1 },
        total: { type: "number", example: 59980 },
        direccion_envio: { type: "string", example: "Av. Principal 123, Santiago" },
        telefono_contacto: { type: "string", example: "+56912345678" },
        notas: { type: "string", example: "Entregar en horario de oficina" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              producto_id: { type: "integer", example: 1 },
              cantidad: { type: "integer", example: 2 },
              precio_unitario: { type: "number", example: 29990 },
              subtotal: { type: "number", example: 59980 }
            }
          }
        }
      }
    },
    OrdenFromCarrito: {
      type: "object",
      properties: {
        direccion_envio: { type: "string", example: "Av. Principal 123, Santiago" },
        telefono_contacto: { type: "string", example: "+56912345678" },
        notas: { type: "string", example: "Entregar en horario de oficina" }
      }
    }
  }
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];
swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  //esperar un momento para asegurar que el archivo esté completamente escrito
  await new Promise(resolve => setTimeout(resolve, 100));
  
  //post-procesamiento para añadir body parameters a los POST que no los tienen
  const fs = await import('fs/promises');
  let swaggerDoc;
  try {
    swaggerDoc = JSON.parse(await fs.readFile(outputFile, 'utf8'));
  } catch (error) {
    console.error('Error leyendo swagger-output.json:', error);
    return;
  }
  
  //añadir body parameters a POST /api/usuarios
  if (swaggerDoc.paths['/api/usuarios/'] && swaggerDoc.paths['/api/usuarios/'].post) {
    const postEndpoint = swaggerDoc.paths['/api/usuarios/'].post;
    postEndpoint.parameters = [{
      name: 'body',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Usuario' }
    }];
    //reordenar para que parameters esté antes de responses
    const ordered = { description: postEndpoint.description, parameters: postEndpoint.parameters, responses: postEndpoint.responses };
    swaggerDoc.paths['/api/usuarios/'].post = ordered;
  }
  
  //añadir body parameters a POST /api/categorias
  if (swaggerDoc.paths['/api/categorias/'] && swaggerDoc.paths['/api/categorias/'].post) {
    if (!swaggerDoc.paths['/api/categorias/'].post.parameters) {
      swaggerDoc.paths['/api/categorias/'].post.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/categorias/'].post.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/categorias/'].post.parameters.push({
        name: 'body',
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Categoria' }
      });
    }
  }
  
  //añadir body parameters a POST /api/productos
  if (swaggerDoc.paths['/api/productos/'] && swaggerDoc.paths['/api/productos/'].post) {
    if (!swaggerDoc.paths['/api/productos/'].post.parameters) {
      swaggerDoc.paths['/api/productos/'].post.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/productos/'].post.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/productos/'].post.parameters.push({
        name: 'body',
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Producto' }
      });
    }
  }
  
  //añadir body parameters a POST /api/blogs
  if (swaggerDoc.paths['/api/blogs/'] && swaggerDoc.paths['/api/blogs/'].post) {
    if (!swaggerDoc.paths['/api/blogs/'].post.parameters) {
      swaggerDoc.paths['/api/blogs/'].post.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/blogs/'].post.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/blogs/'].post.parameters.push({
        name: 'body',
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Blog' }
      });
    }
  }
  
  //añadir body parameters a PUT endpoints
  if (swaggerDoc.paths['/api/usuarios/{id}'] && swaggerDoc.paths['/api/usuarios/{id}'].put) {
    if (!swaggerDoc.paths['/api/usuarios/{id}'].put.parameters) {
      swaggerDoc.paths['/api/usuarios/{id}'].put.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/usuarios/{id}'].put.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/usuarios/{id}'].put.parameters.push({
        name: 'body',
        in: 'body',
        schema: { $ref: '#/definitions/Usuario' }
      });
    }
  }
  
  if (swaggerDoc.paths['/api/categorias/{id}'] && swaggerDoc.paths['/api/categorias/{id}'].put) {
    if (!swaggerDoc.paths['/api/categorias/{id}'].put.parameters) {
      swaggerDoc.paths['/api/categorias/{id}'].put.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/categorias/{id}'].put.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/categorias/{id}'].put.parameters.push({
        name: 'body',
        in: 'body',
        schema: { $ref: '#/definitions/Categoria' }
      });
    }
  }
  
  if (swaggerDoc.paths['/api/productos/{id}'] && swaggerDoc.paths['/api/productos/{id}'].put) {
    if (!swaggerDoc.paths['/api/productos/{id}'].put.parameters) {
      swaggerDoc.paths['/api/productos/{id}'].put.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/productos/{id}'].put.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/productos/{id}'].put.parameters.push({
        name: 'body',
        in: 'body',
        schema: { $ref: '#/definitions/Producto' }
      });
    }
  }
  
  if (swaggerDoc.paths['/api/blogs/{id}'] && swaggerDoc.paths['/api/blogs/{id}'].put) {
    if (!swaggerDoc.paths['/api/blogs/{id}'].put.parameters) {
      swaggerDoc.paths['/api/blogs/{id}'].put.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/blogs/{id}'].put.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/blogs/{id}'].put.parameters.push({
        name: 'body',
        in: 'body',
        schema: { $ref: '#/definitions/Blog' }
      });
    }
  }
  
  //añadir body parameters a POST /api/ordenes
  if (swaggerDoc.paths['/api/ordenes/'] && swaggerDoc.paths['/api/ordenes/'].post) {
    if (!swaggerDoc.paths['/api/ordenes/'].post.parameters) {
      swaggerDoc.paths['/api/ordenes/'].post.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/ordenes/'].post.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/ordenes/'].post.parameters.push({
        name: 'body',
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Orden' }
      });
    }
  }
  
  //añadir body parameters a POST /api/ordenes/carrito/:usuarioId
  if (swaggerDoc.paths['/api/ordenes/carrito/{usuarioId}'] && swaggerDoc.paths['/api/ordenes/carrito/{usuarioId}'].post) {
    if (!swaggerDoc.paths['/api/ordenes/carrito/{usuarioId}'].post.parameters) {
      swaggerDoc.paths['/api/ordenes/carrito/{usuarioId}'].post.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/ordenes/carrito/{usuarioId}'].post.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/ordenes/carrito/{usuarioId}'].post.parameters.push({
        name: 'body',
        in: 'body',
        schema: { $ref: '#/definitions/OrdenFromCarrito' }
      });
    }
  }
  
  //añadir body parameters a PUT /api/ordenes/:id
  if (swaggerDoc.paths['/api/ordenes/{id}'] && swaggerDoc.paths['/api/ordenes/{id}'].put) {
    if (!swaggerDoc.paths['/api/ordenes/{id}'].put.parameters) {
      swaggerDoc.paths['/api/ordenes/{id}'].put.parameters = [];
    }
    const hasBodyParam = swaggerDoc.paths['/api/ordenes/{id}'].put.parameters.some(p => p.in === 'body');
    if (!hasBodyParam) {
      swaggerDoc.paths['/api/ordenes/{id}'].put.parameters.push({
        name: 'body',
        in: 'body',
        schema: { $ref: '#/definitions/Orden' }
      });
    }
  }
  
  //asegurar que las definiciones estén presentes y añadirlas correctamente
  if (!swaggerDoc.definitions) {
    swaggerDoc.definitions = {};
  }
  
  //añadir las definiciones con el formato correcto de Swagger 2.0
  swaggerDoc.definitions.Usuario = doc.definitions.Usuario;
  swaggerDoc.definitions.UsuarioLogin = doc.definitions.UsuarioLogin;
  swaggerDoc.definitions.Categoria = doc.definitions.Categoria;
  swaggerDoc.definitions.Producto = doc.definitions.Producto;
  swaggerDoc.definitions.Blog = doc.definitions.Blog;
  swaggerDoc.definitions.CarritoItem = doc.definitions.CarritoItem;
  swaggerDoc.definitions.Orden = doc.definitions.Orden;
  swaggerDoc.definitions.OrdenFromCarrito = doc.definitions.OrdenFromCarrito;
  
  await fs.writeFile(outputFile, JSON.stringify(swaggerDoc, null, 2));
  
  console.log('Swagger documentación actualizada con body parameters y definiciones');
});


