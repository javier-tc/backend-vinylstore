import express from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/", usuarioController.getAll);
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
router.get("/:id", usuarioController.getById);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Usuario' }
} */
router.put("/:id", usuarioController.update);
router.delete("/:id", usuarioController.delete);

export default router;


