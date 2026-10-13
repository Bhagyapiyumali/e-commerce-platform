import Order from '../models/order.js';
import Product from '../models/product.js';
import { isCustomer, isAdmin } from './userController.js';

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
            const item = newOrderData.orderedItems[i];
            const product = await Product.findOne({ 
                productId : item.productId 
            });

            if(product == null) {
                return res.status(404).json({
                    message: "Product with ID "+item.productId+" not found"
                });
            }

            const itemQty = Number(item.quantity || item.qty || 1);
            newProductArray[i] = {
                name: product.productname,
                price: product.price,
                quantity: itemQty,
                image: product.image?.[0] || ""
            };
        }

        newOrderData.orderedItems = newProductArray;
        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;

        const order = new Order(newOrderData);
        const savedOrder = await order.save();

        res.json({
            message: "Order created successfully",
            order : savedOrder
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getOrders(req, res) {
    try {
        if (isCustomer(req)) {
            const orders = await Order.find({ email: req.user.email }).sort({ date: -1 });
            return res.json(orders);
        } else if(isAdmin(req)) {
            const orders = await Order.find({}).sort({ date: -1 });
            return res.json(orders);
        } else {
            return res.status(401).json({
                message: "Please login to view orders"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getQuote(req, res) {
  try {
    const orderedItems = req.body.orderedItems || [];
    if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
      return res.json({
        orderedItems: [],
        total: 0,
        labeledTotal: 0,
      });
    }

    const newProductArray = [];
    let total = 0;
    let labeledTotal = 0;

    for (let i = 0; i < orderedItems.length; i++) {
      const item = orderedItems[i];
      const product = await Product.findOne({
        productId: item.productId,
      });

      if (!product) {
        continue;
      }

      const qty = Number(item.qty || item.quantity || 1);
      const regularPrice = Math.max(Number(product.price) || 0, Number(product.lastPrice) || 0);
      const salePrice = Math.min(Number(product.price) || 0, Number(product.lastPrice) || 0);
      
      const itemPrice = salePrice > 0 ? salePrice : (regularPrice || 0);
      const itemRegular = regularPrice > 0 ? regularPrice : itemPrice;

      labeledTotal += itemRegular * qty;
      total += itemPrice * qty;

      newProductArray.push({
        productId: product.productId,
        name: product.productname,
        price: itemPrice,
        labeledPrice: itemRegular,
        quantity: qty,
        qty: qty,
        image: product.image?.[0] || "",
      });
    }

    res.json({
      orderedItems: newProductArray,
      total: Number(total.toFixed(2)),
      labeledTotal: Number(labeledTotal.toFixed(2)),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateOrder(req, res) {
  if (!isAdmin(req)) {
    res.json({
      message: "Please login as admin to update orders",
    });
  }
  
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({
      orderId: orderId,
    });

    if (order == null) {
      res.status(404).json({
        message: "Order not found",
      })
      return;
    }

    const notes = req.body.notes;
    const status = req.body.status;

    const updateOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { notes: notes, status: status }
    );

    res.json({
      message: "Order updated",
      updateOrder: updateOrder
    });

  }catch(error){

    
    res.status(500).json({
      message: error.message,
    });
  }
}
