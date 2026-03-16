import express from 'express';
import { createProduct, getProducts, deleteProduct, updateProduct, getProductById } from '../controllers/productController.js';



const ProductRouter = express.Router();

ProductRouter.post("/",createProduct);
ProductRouter.get("/",getProducts);
ProductRouter.delete("/:productId", deleteProduct);
ProductRouter.put("/:productId", updateProduct);
ProductRouter.get("/:productId", getProductById);

export default ProductRouter;
