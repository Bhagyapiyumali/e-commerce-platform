import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiPackage, FiCalendar, FiClock, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Order fetch error:", err);
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  }, []);

  const calculateTotal = (orderedItems = []) => {
    return orderedItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F3] text-[#2D1E18] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
            Order History
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#2D1E18]">
            My Purchases
          </h1>
          <p className="text-sm text-[#7A6B63] mt-1">
            Track your skincare parcels and review order details.
          </p>
        </div>

        {loading ? (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#E5D3B3] border-t-[#B08D57]"></div>
            <p className="text-xs text-[#7A6B63]">Retrieving order history...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E5D3B3] p-12 text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F3] text-[#B08D57] flex items-center justify-center mx-auto mb-4">
              <FiPackage size={28} />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2D1E18]">
              No Orders Found
            </h3>
            <p className="text-sm text-[#7A6B63] mt-1 max-w-sm mx-auto">
              You haven&apos;t placed any orders yet. Explore our radiant skincare collection to get started.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex px-6 py-2.5 rounded-full bg-[#B08D57] hover:bg-[#9A7748] text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#E5D3B3] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF7F3] border-b border-[#E5D3B3] text-xs font-semibold text-[#7A6B63] uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Items</th>
                    <th className="p-4 text-right">Total</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5D3B3]/40 text-sm">
                  {orders.map((order) => (
                    <tr
                      key={order.orderId}
                      className="hover:bg-[#FAF7F3]/70 transition cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="p-4 font-semibold text-[#2D1E18]">
                        {order.orderId}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border font-medium uppercase tracking-wider ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-4 text-[#7A6B63]">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar size={14} className="text-[#B08D57]" />
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#7A6B63]">
                        {order.orderedItems?.length || 0} product(s)
                      </td>
                      <td className="p-4 text-right font-bold text-[#B08D57]">
                        LKR {calculateTotal(order.orderedItems).toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="px-3 py-1 rounded-full border border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white text-xs font-medium transition"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl border border-[#E5D3B3] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5D3B3]">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#B08D57] font-semibold">
                    Order Summary
                  </span>
                  <h2 className="text-xl font-serif font-bold text-[#2D1E18]">
                    {selectedOrder.orderId}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs text-[#4A3B32] border-b border-[#E5D3B3]/60">
                <div className="flex justify-between">
                  <span className="text-[#7A6B63]">Status</span>
                  <span className={`px-2 py-0.5 rounded-full border font-semibold uppercase ${getStatusBadge(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6B63]">Date Placed</span>
                  <span>{new Date(selectedOrder.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6B63]">Recipient</span>
                  <span>{selectedOrder.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6B63]">Phone</span>
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6B63]">Delivery Address</span>
                  <span className="max-w-[240px] text-right">{selectedOrder.address}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="py-4">
                <h3 className="text-xs uppercase tracking-wider text-[#7A6B63] font-semibold mb-3">
                  Ordered Products
                </h3>
                <div className="space-y-3">
                  {selectedOrder.orderedItems?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FAF7F3] border border-[#E5D3B3]/60"
                    >
                      <img
                        src={item.image || "/placeholder-product.png"}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E5D3B3]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#2D1E18] truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#7A6B63]">
                          Qty: {item.quantity} &times; LKR {Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#B08D57]">
                        LKR {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5D3B3] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#2D1E18]">Total Paid</span>
                <span className="text-xl font-serif font-bold text-[#B08D57]">
                  LKR {calculateTotal(selectedOrder.orderedItems).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}