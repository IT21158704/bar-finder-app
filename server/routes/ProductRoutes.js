import express from 'express';
import { createProduct, getAllProducts, deleteProduct, updateProduct } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.post('/create-product', createProduct);
productRouter.get('/all-products', getAllProducts);
productRouter.delete('/delete-product/:id', deleteProduct);
productRouter.put('/update-product/:id', updateProduct);

export default productRouter;