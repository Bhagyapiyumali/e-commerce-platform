import express from 'express';
import { createProduct, getProducts, deleteProduct, getProductByName } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);

productRouter.post('/', createProduct);

productRouter.delete('/', deleteProduct);

productRouter.get("/:name", getProductByName);

export default productRouter;

  