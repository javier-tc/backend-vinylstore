import express from "express";
import { categoriaController } from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/", categoriaController.getAll);
router.get("/:id", categoriaController.getById);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Categoria' }
} */
router.post("/", categoriaController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Categoria' }
} */
router.put("/:id", categoriaController.update);
router.delete("/:id", categoriaController.delete);

export default router;

