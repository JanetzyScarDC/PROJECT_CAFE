import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getProducts, createProduct, getProduct, deleteProduct, editProduct } from '../controllers/products.controller.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from '../schemas/product.schemas.js';

const router = Router();

router.get('/productos', authRequired, getProducts);
router.post('/productos', authRequired, validateSchema(productSchema), createProduct);
router.get('/productos/:id', authRequired, getProduct);
router.delete('/productos/:id', authRequired, deleteProduct);
router.put('/productos/:id', authRequired, validateSchema(productSchema), editProduct);

export default router;
