import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import uploadMediaToSupabase from '../../utils/mediaUpload';
import { useLocation } from 'react-router-dom';


export default function EditProductForm() {

    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state.product;

    const altName = product.altName.join(', ');

    if(product == null){
        navigate("/admin/products")
    }



    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productname);
    const [alternativeName, setAlternativeName] = useState(altName);
    const [imageUrls, setImageUrls] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [lastPrice, setLastPrice] = useState(product.lastPrice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);
    
    
    




    console.log(location);

async function handleAddProduct() {
    const altName = alternativeName.split(',')
    
    const promisesArray = [];
    let imgUrls = product.image;
    if(imageFiles.length > 0){

    for (let i = 0; i < imageFiles.length; i++) {
        promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

    imgUrls = await Promise.all(promisesArray);
    console.log(imgUrls);

    }


    const productData = {
        productId : productId,
        productname : productName,
        altName : altName,
        image : imgUrls,
        price : price,
        lastPrice : lastPrice,
        stock : stock,
        description : description
    }

    const token = localStorage.getItem('token');
    try {

        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${product.productId}`, productData, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        navigate('/admin/products')
        toast.success('Product updated successfully!');

    } catch (err) {
    console.log(err);
        toast.error('Failed to update product. Please try again.');
    }
}



    return (
        <div className="min-h-screen bg-linear-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
            
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
                
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Edit Product Form
                </h1>

                <div className="space-y-4">
                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Product ID
                        </label>
                        <input
                            disabled
                            type="text"
                            placeholder="Enter product ID"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Alternative Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter alternative name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={alternativeName}
                            onChange={(e) => setAlternativeName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Image URLs
                        </label>
                        <input
                            type="file"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            onChange={(e) =>{ 
                                setImageFiles(e.target.files)}}
                                multiple
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Last Price
                        </label>
                        <input
                            type="number"
                            placeholder="Enter previous price"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={lastPrice}
                            onChange={(e) => setLastPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Stock
                        </label>
                        <input
                            type="number"
                            placeholder="Enter available stock quantity"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Enter product description"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>





                </div>

                <button 
                    onClick={handleAddProduct}
                    className="w-full bg-blue-600 text-black py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                    Edit Product
                </button>

            </div>

        </div>
    );
}
