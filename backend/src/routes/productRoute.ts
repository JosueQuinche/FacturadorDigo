import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

// Ruta para obtener un producto por ID
router.get('/read/:id', productController.read);
router.get('/read', productController.read);

// Ruta para crear un producto
router.post('/create', productController.create);

// Ruta para eliminar un producto por ID
router.delete('/delete/:id', productController.delete);

// Ruta para actualizar un producto
router.put('/update/:id', productController.update);

export default router;
