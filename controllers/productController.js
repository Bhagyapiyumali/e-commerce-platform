import e from 'express';
import Product from '../models/product.js';

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