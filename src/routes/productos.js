import express from "express";
import { productoController } from "../controllers/productoController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

//rutas públicas
router.get("/", productoController.getAll);
router.get("/categoria/:categoriaId", productoController.getByCategoria);
router.get("/buscar", productoController.getByArtista);
router.get("/:id", productoController.getById);

//rutas protegidas - solo administradores
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Producto' }
} */
router.post("/", authenticate, authorize('Administrador'), productoController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Producto' }
} */
router.put("/:id", authenticate, authorize('Administrador'), productoController.update);
router.delete("/:id", authenticate, authorize('Administrador'), productoController.delete);

export default router;

