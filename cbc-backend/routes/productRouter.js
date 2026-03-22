import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';


const ProductRouter = express.Router();

ProductRouter.post("/",createProduct);
ProductRouter.get("/",getProducts);
ProductRouter.delete("/:productId", deleteProduct);

export default ProductRouter;
