import Order from '../models/order.js';
import Product from '../models/product.js';
import { isCustomer } from './userController.js';

export async function createOrder(req, res) {

    if (!isCustomer(req)) {
        return res.json({
            message: "Only customers can place orders"
        });
    }

    try {
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

        let orderId;
        if (latestOrder.length == 0) {
            orderId = "cbc001";
        } else {
            const currentOrderId = latestOrder[0].orderId;
            const number = parseInt(currentOrderId.replace("cbc", ""));
            orderId = "cbc" + (number + 1).toString().padStart(4, '0');
        }

        const newOrderData = req.body;

        const newProductArray = []

        for (let i=0;i<newOrderData.orderedItems.length;i++) {
            

            const product = await Product.findOne({ 
                productId : newOrderData.orderedItems[i].productId 
            });
            

            if(product == null) {
                return res.json({
                    message: "Product with ID "+newOrderData.orderedItems[i].productId+" not found"
                });
                return;
            }

            newProductArray[i] = {
                name: product.productname,
                price: product.price,
                quantity: newOrderData.orderedItems[i].quantity,
                image: product.image[0]
            };
        }
        console.log(newProductArray);

        newOrderData.orderedItems = newProductArray;

        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;

        const order = new Order(newOrderData);
        await order.save();

        res.json({
            message: "Order created successfully",
            
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await Order.find({ email: req.user.email });
        res.json(orders);

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
