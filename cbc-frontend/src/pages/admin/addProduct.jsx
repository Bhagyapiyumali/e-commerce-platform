export default function AddProductPage() {
    return (
        <div className="w-full h-full bg-blue-200">
            <h1 className="text-2xl text-center">
                Add Product Form

            </h1>
            <div className="bg-white p-4 rounded shadow-md mt-4">
                <input type="text" placeholder="Insert your product name here" className="border border-gray-300 rounded px-3 py-2 w-full mb-2"/>
                <input type="text" placeholder="Insert your product price here" className="border border-gray-300 rounded px-3 py-2 w-full mb-2"/>
                <input type="text" placeholder="Insert your product description here" className="border border-gray-300 rounded px-3 py-2 w-full mb-2"/>
                <input type="text" placeholder="Insert your product image url here" className="border border-gray-300 rounded px-3 py-2 w-full mb-2"/>
                <button className="bg-blue-500 text-black px-4 py-2 rounded mt-4">Add Product</button>
            </div>
        </div>
    )
}
