import express from "express";
import { blogController } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Blog' }
} */
router.post("/", blogController.create);
/* #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/Blog' }
} */
router.put("/:id", blogController.update);
router.delete("/:id", blogController.delete);

export default router;

