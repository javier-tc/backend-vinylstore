import express from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

//rutas públicas
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Usuario' }
} */
router.post("/", usuarioController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/UsuarioLogin' }
} */
router.post("/login", usuarioController.login);
router.post("/refresh-token", usuarioController.refreshToken);

//rutas protegidas - solo administradores
router.get("/", authenticate, authorize('Administrador'), usuarioController.getAll);
router.get("/:id", authenticate, usuarioController.getById);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Usuario' }
} */
router.put("/:id", authenticate, usuarioController.update);
router.delete("/:id", authenticate, authorize('Administrador'), usuarioController.delete);

export default router;


