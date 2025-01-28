import express from 'express';
import tenantController from '../controllers/tenantController';

const router = express.Router();

// Obtener todos los tenants
router.get('/read', tenantController.read);

// Crear un nuevo tenant
router.post('/create', tenantController.create);

router.put('/update/:id', tenantController.update);
// Rutas para obtener, actualizar o eliminar un tenant específico usando el ID
router.route("/:id")
  .get(tenantController.read_detail)  // Obtener detalles del tenant por ID
  .put(tenantController.update)       // Actualizar un tenant por ID
  .delete(tenantController.delete);   // Eliminar un tenant por ID

export default router;
