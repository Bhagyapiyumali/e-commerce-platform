import { Link, Outlet } from "react-router-dom";

import { GoGraph } from "react-icons/go";
import { FiBox, FiShoppingCart, FiUsers } from "react-icons/fi";

export default function AdminHomePage() {
    return (
        <div className="w-full h-screen flex bg-gray-100">
            
            {/* Sidebar */}
            <div className="w-1/4 bg-blue-700 text-white flex flex-col p-6 space-y-4">
                
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

                <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition"
                >
                    <GoGraph size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link
                    to="/admin/products"
                    className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition"
                >
                    <FiBox size={20} />
                    <span>Products</span>
                </Link>

                <Link
                    to="/admin/orders"
                    className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition"
                >
                    <FiShoppingCart size={20} />
                    <span>Orders</span>
                </Link>

                <Link
                    to="/admin/customers"
                    className="flex items-center gap-3 p-2 rounded hover:bg-blue-600 transition"
                >
                    <FiUsers size={20} />
                    <span>Customers</span>
                </Link>

            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                
                <h1 className="text-3xl font-semibold text-gray-800">
                    Welcome Admin 👋
                </h1>
                
                <Outlet />
            </div>

        </div>
    );
}
