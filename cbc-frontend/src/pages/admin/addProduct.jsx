import { useState } from 'react';
export default function AddProductPage() {

    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [alternativeName, setAlternativeName] = useState('');
    const [imageUrls, setImageUrls] = useState('');
    const [price, setPrice] = useState('');
    const [lastPrice, setLastPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');

function handleAddProduct() {
    console.log({
        productId,
        productName,
        alternativeName,
        imageUrls,
        price,
        lastPrice,
        stock,
        description
    });
    // Here you would typically send this data to your backend API
}



    return (
        <div className="min-h-screen bg-linear-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
            
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
                
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Add New Product
                </h1>

                <div className="space-y-4">
                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Product ID
                        </label>
                        <input
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
                        <textarea
                            rows="3"
                            placeholder="Enter image URLs separated by commas"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={imageUrls}
                            onChange={(e) => setImageUrls(e.target.value)}
                        ></textarea>
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

                <button className="w-full bg-blue-600 text-black py-3 rounded-lg mt-6 font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                    Add Product
                </button>

            </div>

        </div>
    );
}
