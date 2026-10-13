import e from 'express';
import Product from '../models/product.js';
import { isAdmin } from './userController.js';

export function createProduct(req, res) {
    if (!req.user || req.user.type !== "admin") {
        res.json({
            message: "Only admin users can add products"
        });
        return;
    }
    const newProductData = req.body;
    const product = new Product(newProductData);
    product.save()
        .then(() => {
            res.json({
                message: "Product created successfully"
            });
        }).catch((err) => {
            res.json({
                message: err.message
            });
        });
}

export function getProducts(req, res) {
    Product.find().lean()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error("Error retrieving products:", err.message);
            res.status(500).json({
                message: "Error retrieving products",
                error: err.message
            });
        });
}

export function deleteProduct(req, res) {

    if (!isAdmin(req)) {
        res.json({
            message: "Only admin users can delete products"
        });
        return;
    }
    const productId = req.params.productId;
    Product.deleteOne({ productId: productId })

        .then(() => {
            res.json({
                message: "Product deleted successfully"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "err"
            });
        });
}

export function updateProduct(req, res) {

    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Only admin users can update products"
        });
        return;
    }
    const productId = req.params.productId;
    const updatedData = req.body;
    Product.updateOne({ productId: productId }, updatedData)
        .then(() => {
            res.json({
                message: "Product updated successfully"
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error updating product"
            });
        });
}


export async function getProductById(req, res) {
  try {
    const productId = req.params.productId;

    const product = await Product.findOne({ productId: productId });

    res.json(product);
  } catch (e) {
    res.status(500).json({
      e,
    });
  }
}

export async function searchProducts(req, res) {
  const query = (req.params.query || "").trim();
  try {
    if (!query) {
      const products = await Product.find();
      return res.json(products);
    }
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, "i");

    const products = await Product.find({
      $or: [
        { productname: { $regex: regex } },
        { altName: { $elemMatch: { $regex: regex } } },
        { productId: { $regex: regex } },
        { description: { $regex: regex } }
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error searching products"
    });
  }
}