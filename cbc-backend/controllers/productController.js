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
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Error retrieving products"
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
  const query = req.params.query;
  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { altNames: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({
      e,
    });
  }
}