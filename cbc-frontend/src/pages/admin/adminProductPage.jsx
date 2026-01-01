import axios from "axios"
import { useEffect, useState } from "react"
import { FaTrash, FaPen } from "react-icons/fa"

export default function AdminProductPage() {

    const [products, setProducts] = useState([

        
    ]);


    useEffect(() => {
        axios.get("http://localhost:5000/api/products").then((res) => {
            console.log(res.data);
            setProducts(res.data);
            console.log(
                {
                    discountTitle: "Summer Sale",
                    products : products[0],

                }
            );
            console.log({
                discountTitle: "Summer Sale",
            }
        );
        }
    )
    }, []);

    return (
  <div className="mt-6 bg-white rounded-xl shadow-lg p-6">

    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Admin Products Management
      </h1>

      <span className="px-4 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
        Total Products: {products.length}
      </span>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
            <th className="px-4 py-3 text-left">Product ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Last Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-700">
                {product.productId}
              </td>

              <td className="px-4 py-3 text-gray-800">
                {product.productname}
              </td>

              <td className="px-4 py-3 text-green-600 font-semibold">
                Rs. {product.price}
              </td>

              <td className="px-4 py-3 text-gray-500 line-through">
                Rs. {product.lastPrice}
              </td>

              <td className="px-4 py-3">
                <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                  {product.stock} In Stock
                </span>
              </td>

              <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                {product.description}
              </td>

              <td className="px-4 py-3 text-center">
                <button className="text-red-500 hover:text-red-700 mr-4">
                  <FaTrash />
                </button>

                <button className="text-blue-500 hover:text-blue-700">
                  <FaPen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);

}