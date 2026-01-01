import axios from "axios"
export default function AdminProductPage() {

    const [products, setProducts] = useState([

        {
        "_id": "692f3b24dd643f7092734f34",
        "productId": "B1001",
        "productname": "Hydrating Face Moisturizer",
        "altName": [
            "Moisturizer",
            "Face Cream"
        ],
        "image": [
            "https://example.com/images/moisturizer-1.jpg",
            "https://example.com/images/moisturizer-2.jpg"
        ],
        "price": 2800,
        "lastPrice": 3200,
        "stock": 45,
        "description": "A lightweight hydrating face moisturizer suitable for all skin types. Keeps your skin soft and glowing for 24 hours.",
        "__v": 0
    },
    {
        "_id": "69318e81add4071e94ba8cea",
        "productId": "B1005",
        "productname": "Hydrating Face Moisturizer",
        "altName": [
            "Moisturizer",
            "Face Cream"
        ],
        "image": [
            "https://example.com/images/moisturizer-1.jpg",
            "https://example.com/images/moisturizer-2.jpg"
        ],
        "price": 2800,
        "lastPrice": 3200,
        "stock": 45,
        "description": "A lightweight hydrating face moisturizer suitable for all skin types. Keeps your skin soft and glowing for 24 hours.",
        "__v": 0
    },
    {
        "_id": "6931941badd4071e94ba8d18",
        "productId": "B1002",
        "productname": "Hydrating Face serum",
        "altName": [
            "Moisturizer",
            "Face Cream"
        ],
        "image": [
            "https://example.com/images/moisturizer-1.jpg",
            "https://example.com/images/moisturizer-2.jpg"
        ],
        "price": 2800,
        "lastPrice": 3200,
        "stock": 45,
        "description": "A lightweight hydrating face moisturizer suitable for all skin types. Keeps your skin soft and glowing for 24 hours.",
        "__v": 0
    },
    {
        "_id": "69319434add4071e94ba8d1a",
        "productId": "B1003",
        "productname": "Face serum",
        "altName": [
            "Moisturizer",
            "Face Cream"
        ],
        "image": [
            "https://example.com/images/moisturizer-1.jpg",
            "https://example.com/images/moisturizer-2.jpg"
        ],
        "price": 2800,
        "lastPrice": 3200,
        "stock": 45,
        "description": "A lightweight hydrating face moisturizer suitable for all skin types. Keeps your skin soft and glowing for 24 hours.",
        "__v": 0
    }
    ])


    useEffect(() => {
        axios.get("http://localhost:5000/api/products").then((res) => {
            console.log(res.data)
            setProducts(res.data)
        })
    }, [])

    return (
        <div>
            <h1>Admin Product Page</h1>

            {
            products.map(
                (product, index) => {
                    return (
                        <div key={product._id} >
                            {index}
                            <h2>{product.productname}</h2>
                        </div>
                    )
                }
            )


            }
        </div>
    )
}