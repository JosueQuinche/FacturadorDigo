import express from "express";
import clientController from "../controllers/clientController";

const router = express.Router();

// Ruta para obtener todos los clientes
router.get("/read", clientController.read);

router.get('/read', clientController.read);
// Ruta para crear un cliente
router.post("/create", clientController.create);

router.put('/update/:id', (req, res, next) => {
    console.log("Actualizo");
    next();
}, clientController.update); 

router.get("/read/:id", clientController.read);
router.delete("/delete/:id", clientController.delete);

export default router;
