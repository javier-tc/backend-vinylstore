import express from "express";
import { carritoController } from "../controllers/carritoController.js";

const router = express.Router();

router.get("/:usuarioId", carritoController.getByUsuario);
router.post("/:usuarioId/:productoId", carritoController.addItem);
router.put("/:usuarioId/:productoId", carritoController.updateItem);
router.delete("/:usuarioId/:productoId", carritoController.removeItem);
router.delete("/:usuarioId", carritoController.clear);

export default router;

