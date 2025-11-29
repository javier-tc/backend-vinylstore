import express from "express";
import { ordenController } from "../controllers/ordenController.js";

const router = express.Router();

router.get("/", ordenController.getAll);
router.get("/:id", ordenController.getById);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Orden' }
} */
router.post("/", ordenController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/OrdenFromCarrito' }
} */
router.post("/carrito/:usuarioId", ordenController.createFromCarrito);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Orden' }
} */
router.put("/:id", ordenController.update);
router.delete("/:id", ordenController.delete);

export default router;

