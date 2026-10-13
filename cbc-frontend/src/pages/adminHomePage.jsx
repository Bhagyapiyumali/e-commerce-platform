import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FiBox, FiShoppingCart, FiUsers, FiExternalLink, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminHomePage() {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login as an admin to access this panel.");
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data || res.data.type !== "admin") {
          toast.error("Unauthorized access: Admin account required.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setAdminUser(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to verify admin status:", err);
        toast.error("Session expired or invalid. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <GoGraph size={19} /> },
    { label: "Products", path: "/admin/products", icon: <FiBox size={19} /> },
    { label: "Orders", path: "/admin/orders", icon: <FiShoppingCart size={19} /> },
    { label: "Customers", path: "/admin/customers", icon: <FiUsers size={19} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#E5D3B3] border-t-[#B08D57]"></div>
        <p className="text-xs text-[#7A6B63]">Verifying administrator credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FAF7F3] text-[#2D1E18]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2D1E18] text-white flex flex-col shrink-0 border-r border-[#E5D3B3]/20 shadow-xl">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="CBC"
              className="h-9 w-9 rounded-full border border-[#B08D57] object-contain"
            />
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                CBC <span className="text-[#B08D57] font-sans text-xs">Admin</span>
              </h2>
              <p className="text-[10px] text-gray-400">Cosmetics Management</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#B08D57] text-white shadow-md font-semibold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Status & Store Link */}
        <div className="p-4 border-t border-white/10 space-y-2 text-xs">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
          >
            <span>View Public Store</span>
            <FiExternalLink size={14} />
          </Link>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between px-2">
            <div className="truncate pr-2">
              <p className="text-white font-medium truncate">
                {adminUser?.firstName || "Admin"}
              </p>
              <p className="text-[10px] text-gray-400 truncate">{adminUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
              title="Logout"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Outlet */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-6 sm:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
