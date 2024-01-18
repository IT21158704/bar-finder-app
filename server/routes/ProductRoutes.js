import express from 'express';
import { createProduct, getAllProducts, deleteProduct, updateProduct, getProdutsInStores } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.post('/create-product', createProduct);
productRouter.get('/all-products', getAllProducts);
productRouter.delete('/delete-product/:id', deleteProduct);
productRouter.put('/update-product/:id', updateProduct);
productRouter.get('/products-in-store/:id', getProdutsInStores);

export default productRouter;