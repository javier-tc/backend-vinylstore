import express from "express";
//creación del router
const router = express.Router();
//creación de una ruta GET
router.get("/", (req, res) => {
res.json("Hola desde express!");
});
//exportación del router
export default router;


