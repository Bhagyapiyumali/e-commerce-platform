import express from "express";
import { createOrder, getOrders, getQuote, updateOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.post("/quote", getQuote);
orderRouter.get("/", getOrders);
orderRouter.put("/:orderId", updateOrder);

export default orderRouter;
