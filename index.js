import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };
import usersRouter from "./src/routes/users.js";

const app = express();
const PORT = 3000;

//middlewares
app.use(cors());
app.use(express.json());

//rutas
app.use("/users", usersRouter);

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

