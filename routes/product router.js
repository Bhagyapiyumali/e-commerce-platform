import express from 'express';

const productRouter = express.Router();

productRouter.get('/', (req, res) => {
    res.json({
        message: "This is a GET request for product router"
    })
})

productRouter.post('/', (req, res) => {
    res.json({
        message: "This is a POST request for product router"
    })
})

export default productRouter;
