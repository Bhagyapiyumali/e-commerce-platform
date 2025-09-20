import { Link, Outlet, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FiBox, FiShoppingCart, FiUsers } from "react-icons/fi";
import EditProductForm from "./admin/editProductForm";

import AddProductPage from "./admin/addProduct";
import AdminProductPage from "./admin/adminProductPage";
import AdminOrderPage from "./admin/adminOrderPage";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminHomePage() {
  const [user,setUser] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {      
      navigate("/login")
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{
        console.log(res.data)
        if(res.data.type!="admin"){
          toast.error("Unauthorized access")
          localStorage.removeItem("token")
          navigate("/login")
        }else{
          setUser(res.data)
        }

      }).catch((err)=>{
        console.error(err)
        toast.error("Failed to fetch user data")
        localStorage.removeItem("token")
        navigate("/login")
      })
    
  },[navigate])



    return (
        <div className="min-h-screen flex bg-gray-100">


            
            {/* Sidebar */}
            <div className="w-64 bg-blue-700 text-white flex flex-col p-6 space-y-4">
                
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
                <Routes path="/products/editProduct" element={<EditProductForm />} />

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
                
                {/*<h1 className="text-3xl font-semibold text-gray-800">
                    Welcome Admin 👋
                </h1>*/}
                
                <Outlet />
                <Routes path="/*">
                <Route path="/products/addProduct" element={<h1>Add Product</h1>} />
                <Route path="/products/editProduct" element={<EditProductForm />} />
               
                <Route path="/orders" element={<AdminOrderPage />} />
               
                <Route path="/customers" element={<h1>Customers</h1>} />
                

                </Routes>
            </div>

        </div>
    );

    return null;
}
