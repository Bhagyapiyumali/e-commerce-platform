import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

export default function CartCard({ productId, qty, onQtyChange, onRemove }) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
      .then((response) => {
        if (!isMounted) return;
        if (response.data != null) {
          setProduct(response.data);
          setLoaded(true);
        } else {
          if (onRemove) onRemove(productId);
        }
      })
      .catch((error) => {
        console.error("Cart item fetch error:", error);
        if (isMounted) setLoaded(true);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const regularPrice = product ? Math.max(Number(product.price) || 0, Number(product.lastPrice) || 0) : 0;
  const salePrice = product ? Math.min(Number(product.price) || 0, Number(product.lastPrice) || 0) : 0;
  const unitPrice = salePrice > 0 ? salePrice : regularPrice;
  const itemTotal = unitPrice * qty;

  if (!loaded) {
    return (
      <tr className="border-b border-[#E5D3B3]/40 animate-pulse">
        <td className="p-4 text-center">
          <div className="w-16 h-16 bg-[#E5D3B3]/30 rounded-lg mx-auto"></div>
        </td>
        <td className="p-4">
          <div className="h-4 bg-[#E5D3B3]/40 rounded w-32 mb-2"></div>
          <div className="h-3 bg-[#E5D3B3]/20 rounded w-16"></div>
        </td>
        <td className="p-4 text-center">
          <div className="h-4 bg-[#E5D3B3]/30 rounded w-12 mx-auto"></div>
        </td>
        <td className="p-4 text-center">
          <div className="h-8 bg-[#E5D3B3]/20 rounded-full w-24 mx-auto"></div>
        </td>
        <td className="p-4 text-center">
          <div className="h-4 bg-[#E5D3B3]/30 rounded w-16 mx-auto"></div>
        </td>
        <td className="p-4 text-right">
          <div className="h-4 bg-[#E5D3B3]/40 rounded w-20 ml-auto"></div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-[#E5D3B3]/50 hover:bg-[#FAF7F3] transition text-[#2D1E18]">
      {/* Product Image */}
      <td className="p-3 text-center w-24">
        <img
          src={product?.image?.[0] || "/placeholder-product.png"}
          alt={product?.productname || "Product"}
          className="w-16 h-16 object-cover rounded-xl border border-[#E5D3B3] mx-auto shadow-xs"
        />
      </td>

      {/* Name and ID */}
      <td className="p-3">
        <h3 className="font-medium text-[#2D1E18] text-sm sm:text-base leading-snug">
          {product?.productname || "Unknown Product"}
        </h3>
        <span className="text-xs text-[#7A6B63] block mt-0.5">
          SKU: {productId}
        </span>
      </td>

      {/* Unit Price */}
      <td className="p-3 text-center text-sm">
        <span className="font-semibold text-[#B08D57]">
          LKR {unitPrice.toFixed(2)}
        </span>
        {regularPrice > unitPrice && (
          <span className="text-xs text-gray-400 line-through block">
            LKR {regularPrice.toFixed(2)}
          </span>
        )}
      </td>

      {/* Quantity Stepper */}
      <td className="p-3 text-center">
        <div className="inline-flex items-center border border-[#E5D3B3] rounded-full bg-white shadow-xs">
          <button
            type="button"
            onClick={() => onQtyChange(productId, Math.max(1, qty - 1))}
            className="p-1.5 text-[#6B4F3A] hover:text-[#B08D57] transition disabled:opacity-40"
            disabled={qty <= 1}
            title="Decrease quantity"
          >
            <FiMinus size={13} />
          </button>
          <span className="px-3 text-xs font-semibold text-[#2D1E18] min-w-[24px]">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => onQtyChange(productId, qty + 1)}
            className="p-1.5 text-[#6B4F3A] hover:text-[#B08D57] transition"
            title="Increase quantity"
          >
            <FiPlus size={13} />
          </button>
        </div>
      </td>

      {/* Total */}
      <td className="p-3 text-right font-bold text-[#2D1E18] text-sm sm:text-base">
        LKR {itemTotal.toFixed(2)}
      </td>

      {/* Remove Action */}
      <td className="p-3 text-center w-12">
        <button
          type="button"
          onClick={() => onRemove(productId)}
          className="text-red-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition"
          title="Remove from cart"
        >
          <FiTrash2 size={16} />
        </button>
      </td>
    </tr>
  );
}