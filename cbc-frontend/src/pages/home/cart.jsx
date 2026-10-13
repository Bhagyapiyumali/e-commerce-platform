import { useEffect, useState, useCallback } from "react";
import { loadCart, updateItemQty, deleteItem, clearCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FiShoppingBag, FiArrowLeft, FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const [cart, setCart] = useState(() => loadCart());
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [isQuoting, setIsQuoting] = useState(false);
  const navigate = useNavigate();

  const calculateQuote = useCallback((currentCart) => {
    if (!currentCart || currentCart.length === 0) {
      setTotal(0);
      setLabeledTotal(0);
      return;
    }

    setIsQuoting(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, {
        orderedItems: currentCart,
      })
      .then((res) => {
        if (res.data && res.data.total != null) {
          setTotal(Number(res.data.total) || 0);
          setLabeledTotal(Number(res.data.labeledTotal) || 0);
        }
      })
      .catch((err) => {
        console.error("Quote calculation error:", err);
      })
      .finally(() => {
        setIsQuoting(false);
      });
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const updated = loadCart();
      setCart(updated);
      calculateQuote(updated);
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, [calculateQuote]);

  useEffect(() => {
    const initialItems = loadCart();
    if (initialItems.length > 0) {
      calculateQuote(initialItems);
    }
  }, [calculateQuote]);

  const handleQtyChange = (productId, newQty) => {
    updateItemQty(productId, newQty);
    const updated = loadCart();
    setCart(updated);
    calculateQuote(updated);
  };

  const handleRemove = (productId) => {
    deleteItem(productId);
    const updated = loadCart();
    setCart(updated);
    calculateQuote(updated);
  };

  const handleClear = () => {
    clearCart();
    setCart([]);
    setTotal(0);
    setLabeledTotal(0);
  };

  function onOrderCheckOutClick() {
    navigate("/shipping", {
      state: {
        items: cart,
      },
    });
  }

  const discount = Math.max(0, labeledTotal - total);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] w-full bg-[#FAF7F3] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white border border-[#E5D3B3] flex items-center justify-center text-[#B08D57] mb-6 shadow-sm">
          <FiShoppingBag size={32} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#2D1E18]">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-sm text-[#7A6B63] mt-2 max-w-md">
          Discover our curated skincare essentials and start treating your skin to the luxury it deserves.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#B08D57] text-white hover:bg-[#9A7748] text-sm font-semibold tracking-wider uppercase transition shadow-md"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF7F3] text-[#2D1E18] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-[#E5D3B3]/60 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
              Checkout Bag
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#2D1E18]">
              Shopping Cart
            </h1>
          </div>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs text-[#7A6B63] hover:text-[#B08D57] transition"
            >
              <FiArrowLeft /> Continue Shopping
            </Link>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition cursor-pointer"
              title="Empty cart"
            >
              <FiTrash2 /> Clear All
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Table Container */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5D3B3] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF7F3] border-b border-[#E5D3B3] text-xs font-semibold text-[#7A6B63] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 text-center">Product</th>
                    <th className="p-4">Details</th>
                    <th className="p-4 text-center">Price</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <CartCard
                      key={item.productId}
                      productId={item.productId}
                      qty={item.qty}
                      onQtyChange={handleQtyChange}
                      onRemove={handleRemove}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-[#E5D3B3] shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-serif font-bold text-[#2D1E18] pb-4 border-b border-[#E5D3B3]">
              Order Summary
            </h2>

            <div className="space-y-3 py-4 text-sm">
              <div className="flex justify-between text-[#7A6B63]">
                <span>Original Subtotal</span>
                <span>LKR {labeledTotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Special Savings</span>
                  <span>- LKR {discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#7A6B63]">
                <span>Shipping</span>
                <span className="text-xs uppercase tracking-wider text-[#B08D57] font-semibold">
                  Free Delivery
                </span>
              </div>

              <div className="pt-3 border-t border-[#E5D3B3] flex justify-between items-baseline">
                <span className="text-base font-bold text-[#2D1E18]">Grand Total</span>
                <span className="text-2xl font-serif font-bold text-[#B08D57]">
                  {isQuoting ? "Calculating..." : `LKR ${total.toFixed(2)}`}
                </span>
              </div>
            </div>

            <button
              onClick={onOrderCheckOutClick}
              disabled={isQuoting || cart.length === 0}
              className="mt-4 w-full py-3.5 rounded-full bg-[#B08D57] hover:bg-[#9A7748] text-white font-semibold text-sm tracking-wider uppercase transition shadow-md disabled:opacity-50 cursor-pointer"
            >
              Proceed to Checkout
            </button>

            <p className="text-center text-xs text-[#7A6B63] mt-3">
              🔒 100% Secure Checkout &middot; Free Luxury Packaging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
