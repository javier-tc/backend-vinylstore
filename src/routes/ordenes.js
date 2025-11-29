import express from "express";
import { ordenController } from "../controllers/ordenController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

//rutas protegidas - todas requieren autenticación
router.get("/", authenticate, authorize('Administrador'), ordenController.getAll);
router.get("/:id", authenticate, ordenController.getById);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Orden' }
} */
router.post("/", authenticate, ordenController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/OrdenFromCarrito' }
} */
router.post("/carrito/:usuarioId", authenticate, ordenController.createFromCarrito);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Orden' }
} */
router.put("/:id", authenticate, authorize('Administrador'), ordenController.update);
router.delete("/:id", authenticate, authorize('Administrador'), ordenController.delete);

export default router;

