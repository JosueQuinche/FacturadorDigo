import express from 'express';
import invoiceDetailController from '../controllers/invoice_detailController';

const router = express.Router();

// Ruta para obtener todos los detalles de las facturas
router.get("/read", invoiceDetailController.read);

// Ruta para crear un nuevo detalle de factura
router.post("/create", invoiceDetailController.create);

// Rutas para obtener, actualizar o eliminar un detalle de factura por ID
router.route("/invoice_details/:id")
    .get(invoiceDetailController.read_detail)
    .put(invoiceDetailController.update)
    .delete(invoiceDetailController.delete);

export default router;
