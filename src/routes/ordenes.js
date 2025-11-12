import express from "express";
import { ordenController } from "../controllers/ordenController.js";

const router = express.Router();

router.get("/", ordenController.getAll);
router.get("/:id", ordenController.getById);
router.post("/", ordenController.create);
router.post("/carrito/:usuarioId", ordenController.createFromCarrito);
router.put("/:id", ordenController.update);
router.delete("/:id", ordenController.delete);

export default router;

