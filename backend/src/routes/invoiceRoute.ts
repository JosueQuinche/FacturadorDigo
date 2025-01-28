import express from 'express';
import invoiceController from '../controllers/invoiceController';
const router = express.Router();

// Leer todas las facturas
router.get('/read', invoiceController.read);

// Crear una nueva factura
router.post('/create', invoiceController.create);

// Leer, actualizar o eliminar una factura específica
router.route("/:id")
  .get(invoiceController.read_detail)
  .put(invoiceController.update)
  .delete(invoiceController.delete);

export default router;
