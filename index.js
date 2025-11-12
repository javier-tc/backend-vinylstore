import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };
import usersRouter from "./src/routes/users.js";
import categoriasRouter from "./src/routes/categorias.js";
import productosRouter from "./src/routes/productos.js";
import blogsRouter from "./src/routes/blogs.js";
import carritoRouter from "./src/routes/carrito.js";
import ordenesRouter from "./src/routes/ordenes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//rutas
app.use("/api/usuarios", usersRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/productos", productosRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/ordenes", ordenesRouter);

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API de VinylStore funcionando correctamente" });
});

//inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

