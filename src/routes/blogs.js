import express from "express";
import { blogController } from "../controllers/blogController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

//rutas públicas
router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);

//rutas protegidas - solo administradores
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Blog' }
} */
router.post("/", authenticate, authorize('Administrador'), blogController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Blog' }
} */
router.put("/:id", authenticate, authorize('Administrador'), blogController.update);
router.delete("/:id", authenticate, authorize('Administrador'), blogController.delete);

export default router;

