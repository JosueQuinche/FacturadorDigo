import express from 'express';
import authController from '../controllers/authController';
const router = express.Router();

router.get('/', authController.read);

router.post('/create', authController.create);

router.post('/login', (req, res) => {
    console.log("Entro")
    return authController.login(req, res)
});

router.route("/:id")
    .get(authController.read_detail)
    .put(authController.update)
    .delete(authController.delete);

export default router;
