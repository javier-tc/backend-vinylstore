import express from "express";
import { productoController } from "../controllers/productoController.js";

const router = express.Router();

router.get("/", productoController.getAll);
router.get("/categoria/:categoriaId", productoController.getByCategoria);
router.get("/buscar", productoController.getByArtista);
router.get("/:id", productoController.getById);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Producto' }
} */
router.post("/", productoController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Producto' }
} */
router.put("/:id", productoController.update);
router.delete("/:id", productoController.delete);

export default router;

