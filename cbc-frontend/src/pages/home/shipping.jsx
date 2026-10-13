import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearCart } from "../../utils/cartFunction";
import { FiArrowLeft, FiLock, FiCheckCircle } from "react-icons/fi";

export default function ShippingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.items;
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.error("No items found for checkout");
      navigate("/cart");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, {
        orderedItems: cart,
      })
      .then((res) => {
        if (res.data && res.data.total != null) {
          setTotal(Number(res.data.total) || 0);
          setLabeledTotal(Number(res.data.labeledTotal) || 0);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch order quote:", err);
      });
  }, [cart, navigate]);

  function validateInputs() {
    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }
    if (!address.trim()) {
      toast.error("Please enter your shipping address.");
      return false;
    }
    if (!phone.trim() || !/^\+?[0-9]{9,12}$/.test(phone.replace(/[\s-]/g, ""))) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
    return true;
  }

  function createOrder() {
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to complete your order.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        {
          orderedItems: cart,
          name: name.trim(),
          address: address.trim(),
          phone: phone.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        clearCart();
        toast.success("Order placed successfully! Thank you.");
        navigate("/orders");
      })
      .catch((err) => {
        console.error("Order submission error:", err);
        toast.error(err.response?.data?.message || "Failed to place order. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  if (!cart) return null;

  const discount = Math.max(0, labeledTotal - total);

  return (
    <div className="min-h-screen w-full bg-[#FAF7F3] text-[#2D1E18] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A6B63] hover:text-[#B08D57] transition mb-6 uppercase tracking-wider"
        >
          <FiArrowLeft size={16} /> Return to Cart
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Shipping Form */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-[#E5D3B3] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B08D57] mb-1">
              <FiLock /> Secure Checkout
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#2D1E18] mb-6">
              Delivery Information
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B4F3A] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl border border-[#E5D3B3] text-sm focus:outline-none focus:ring-2 focus:ring-[#B08D57] bg-[#FAF7F3]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B4F3A] mb-1.5">
                  Delivery Address *
                </label>
                <textarea
                  rows="3"
                  className="w-full p-3 rounded-xl border border-[#E5D3B3] text-sm focus:outline-none focus:ring-2 focus:ring-[#B08D57] bg-[#FAF7F3]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, Postal Code"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B4F3A] mb-1.5">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  className="w-full p-3 rounded-xl border border-[#E5D3B3] text-sm focus:outline-none focus:ring-2 focus:ring-[#B08D57] bg-[#FAF7F3]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0771234567"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E5D3B3]/60 flex items-center gap-3 text-xs text-[#7A6B63]">
              <FiCheckCircle className="text-emerald-600" size={18} />
              <span>Cash on delivery / Card payment upon delivery available.</span>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-[#E5D3B3] p-6 sm:p-8 shadow-md sticky top-24">
            <h2 className="text-lg font-serif font-bold text-[#2D1E18] pb-4 border-b border-[#E5D3B3]">
              Items ({cart.reduce((s, i) => s + (Number(i.qty) || 1), 0)})
            </h2>

            <div className="space-y-3 py-4 text-sm">
              <div className="flex justify-between text-[#7A6B63]">
                <span>Original Subtotal</span>
                <span>LKR {labeledTotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Savings Applied</span>
                  <span>- LKR {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#7A6B63]">
                <span>Delivery</span>
                <span className="text-xs uppercase font-semibold text-[#B08D57]">
                  Complimentary
                </span>
              </div>

              <div className="pt-3 border-t border-[#E5D3B3] flex justify-between items-baseline">
                <span className="text-base font-bold text-[#2D1E18]">Total Due</span>
                <span className="text-2xl font-serif font-bold text-[#B08D57]">
                  LKR {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={createOrder}
              disabled={isSubmitting}
              className="mt-4 w-full py-3.5 rounded-full bg-[#B08D57] hover:bg-[#9A7748] text-white font-semibold text-sm tracking-wider uppercase transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Processing Order..." : "Confirm & Place Order"}
            </button>

            <p className="text-center text-xs text-[#7A6B63] mt-4">
              By confirming, you agree to CBC&apos;s Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}