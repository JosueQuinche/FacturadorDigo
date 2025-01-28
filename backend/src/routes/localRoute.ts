import express from 'express';
import localController from '../controllers/localController';

const router = express.Router();

// Obtener todos los locales
router.get('/', localController.read);

// Crear un nuevo local
router.post('/create', localController.create);

// Rutas para obtener, actualizar o eliminar un local específico usando el ID
router.route("/:id")
    .get(localController.read_detail)  // Obtener detalles del local por ID
    .put(localController.update)       // Actualizar un local por ID
    .delete(localController.delete);   // Eliminar un local por ID

export default router;
