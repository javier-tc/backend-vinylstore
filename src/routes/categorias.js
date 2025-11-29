import express from "express";
import { categoriaController } from "../controllers/categoriaController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

//rutas públicas
router.get("/", categoriaController.getAll);
router.get("/:id", categoriaController.getById);

//rutas protegidas - solo administradores
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Categoria' }
} */
router.post("/", authenticate, authorize('Administrador'), categoriaController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Categoria' }
} */
router.put("/:id", authenticate, authorize('Administrador'), categoriaController.update);
router.delete("/:id", authenticate, authorize('Administrador'), categoriaController.delete);

export default router;

