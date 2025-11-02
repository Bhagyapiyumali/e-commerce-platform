import Product from '../models/product.js';

export function getProducts(req, res) {

    Product.find().then(

        (productList)=>{
            res.json({
                message: 'Products retrieved successfully'
            })
        }
    ).catch(
    (err)=>{
        res.json({
            message: 'Error retrieving products'
        })
    }
    )
}


export function createProduct(req, res) {

    const newProduct = new Product(req.body)
    productRouter.deleteOne({ name: req.body.name }).then(() => {
        res.json({
            message: 'Product deleted successfully'
        })
    }
    )
}

export function deleteProduct(req, res) {

    Product.deleteOne({ name: req.body.name }).then(() => {
        res.json({
            message: 'Product deleted successfully'
        })
    })
}   

