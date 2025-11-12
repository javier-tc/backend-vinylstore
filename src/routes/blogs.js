import express from "express";
import { blogController } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);
router.post("/", blogController.create);
router.put("/:id", blogController.update);
router.delete("/:id", blogController.delete);

export default router;

