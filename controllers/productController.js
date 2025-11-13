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

    console.log(req.user);

    if(req.user == null){
        res.json({
            message : "you are not logged in"
        })
        return;
    }

    if(req.user.type !== "admin"){
        res.json({
            message : "you are not an admin"
        })
        return;
    }

    const newProduct = new Product(req.body)
    newProduct.save().then(() => {
        res.json({
            message: 'Product create successfully'
        })
    }
    )
}

export function deleteProduct(req, res) {

    Product.deleteOne({ name: req.params.name }).then(() => {
        res.json({
            message: 'Product deleted successfully'
        })
    }).catch(
        ()=>{
            res.json({
                message : "Error deleting product"
            })
        }
    )
}

export function getProductByName(req,res){
    const name = req.params.name;

    Product.find({name : name}).then(
        (productList)=>{
            res.json({
                list : productList
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Error"
            })
        }
    )
}

