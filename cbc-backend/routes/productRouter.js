import express from 'express';
import { createProduct, getProducts, deleteProduct, updateProduct } from '../controllers/productController.js';



const ProductRouter = express.Router();

ProductRouter.post("/",createProduct);
ProductRouter.get("/",getProducts);
ProductRouter.delete("/:productId", deleteProduct);
ProductRouter.put("/:productId", updateProduct);

export default ProductRouter;
