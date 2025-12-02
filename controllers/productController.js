import Product from '../models/product.js';

export function createProduct(req, res) {
    if(!isAdmin(req)) {
        res.json({
            message: "Only admin users can create products"
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
                message: err
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