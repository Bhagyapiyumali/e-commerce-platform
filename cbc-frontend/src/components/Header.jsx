import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiMenu, FiX, FiUser } from "react-icons/fi";
import { getCartCount } from "../utils/cartFunction";
import axios from "axios";

export default function Header() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      setCartCount(getCartCount());
    };

    updateCount();
    window.addEventListener("cart-updated", updateCount);
    return () => {
      window.removeEventListener("cart-updated", updateCount);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.email) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch(() => {
        setUser(null);
      });
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  if (user && user.type === "customer") {
    navLinks.push({ label: "My Orders", path: "/orders" });
  }

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5D3B3]/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="CBC Skincare"
            className="h-10 w-10 object-contain rounded-full border border-[#E5D3B3] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-serif font-bold text-lg tracking-wider text-[#2D1E18]">
            CBC <span className="text-[#B08D57] font-normal text-sm font-sans tracking-widest uppercase">Skincare</span>
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                isActive(item.path)
                  ? "text-[#B08D57] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B08D57]"
                  : "text-[#6B4F3A] hover:text-[#B08D57]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user && user.type === "admin" && (
            <Link
              to="/admin/dashboard"
              className="text-xs uppercase font-semibold tracking-wider px-3 py-1 rounded-full bg-[#B08D57]/15 text-[#B08D57] hover:bg-[#B08D57] hover:text-white transition"
            >
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Right: Actions (Cart, Account, Mobile Menu Toggle) */}
        <div className="flex items-center gap-4">
          {/* User Account / Login */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#6B4F3A]">
              <span className="font-medium">
                Hello, {user.firstName || "Customer"}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  window.location.href = "/";
                }}
                className="text-gray-400 hover:text-red-600 transition ml-1"
                title="Sign out"
              >
                (Logout)
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B4F3A] hover:text-[#B08D57] transition py-1.5 px-3 rounded-full border border-[#E5D3B3] hover:border-[#B08D57]"
            >
              <FiUser size={14} /> Login
            </Link>
          )}

          {/* Cart Icon with Live Count Badge */}
          <Link
            to="/cart"
            className="relative p-2 text-[#6B4F3A] hover:text-[#B08D57] transition"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B08D57] text-white text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#6B4F3A] hover:text-[#B08D57] transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5D3B3] px-6 py-5 shadow-lg space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition ${
                  isActive(item.path)
                    ? "text-[#B08D57] font-semibold"
                    : "text-[#6B4F3A]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user && user.type === "admin" && (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#B08D57]"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          <div className="pt-4 border-t border-[#E5D3B3] flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-[#6B4F3A]">
                  Signed in as <strong>{user.firstName}</strong>
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    setMobileMenuOpen(false);
                    window.location.href = "/";
                  }}
                  className="text-xs text-red-500 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-[#B08D57] text-white text-sm font-semibold uppercase tracking-wider"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}