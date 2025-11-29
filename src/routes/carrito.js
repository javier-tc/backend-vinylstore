import express from "express";
import { carritoController } from "../controllers/carritoController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

//todas las rutas del carrito requieren autenticación
//y el usuario solo puede acceder a su propio carrito
router.get("/:usuarioId", authenticate, carritoController.getByUsuario);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CarritoItem' }
} */
router.post("/:usuarioId/:productoId", authenticate, carritoController.addItem);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CarritoItem' }
} */
router.put("/:usuarioId/:productoId", authenticate, carritoController.updateItem);
router.delete("/:usuarioId/:productoId", authenticate, carritoController.removeItem);
router.delete("/:usuarioId", authenticate, carritoController.clear);

export default router;

