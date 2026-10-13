import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";
import { FiArrowLeft, FiPlus, FiMinus, FiCheck, FiShoppingBag, FiTruck, FiShield } from "react-icons/fi";

export default function ProductOverview() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "found" | "not-found"
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setStatus("loading");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`)
      .then((res) => {
        if (res.data != null && res.data.productId) {
          setProduct(res.data);
          setStatus("found");
        } else {
          setStatus("not-found");
        }
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        setStatus("not-found");
      });
  }, [productId]);

  function onAddToCartClick() {
    if (!product) return;
    addToCart(product.productId, quantity);
    toast.success(`${quantity} × ${product.productname || "Product"} added to cart`);
  }

  function onBuyNowClick() {
    if (!product) return;
    addToCart(product.productId, quantity);
    navigate("/shipping", {
      state: {
        items: [{ productId: product.productId, qty: quantity }],
      },
    });
  }

  if (status === "loading") {
    return (
      <div className="min-h-[75vh] w-full bg-[#FAF7F3] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-3 border-[#E5D3B3] border-t-[#B08D57]"></div>
        <p className="text-sm text-[#7A6B63]">Loading product details...</p>
      </div>
    );
  }

  if (status === "not-found" || !product) {
    return <ProductNotFound />;
  }

  const regularPrice = Math.max(Number(product.price) || 0, Number(product.lastPrice) || 0);
  const salePrice = Math.min(Number(product.price) || 0, Number(product.lastPrice) || 0);
  const effectivePrice = salePrice > 0 ? salePrice : regularPrice;
  const hasDiscount = regularPrice > effectivePrice && effectivePrice > 0;
  const stock = Number(product.stock) || 0;
  const inStock = stock > 0;

  return (
    <div className="min-h-screen w-full bg-[#FAF7F3] text-[#2D1E18] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A6B63] hover:text-[#B08D57] transition mb-8 uppercase tracking-wider"
        >
          <FiArrowLeft size={16} /> Back to Products
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl border border-[#E5D3B3] p-6 sm:p-10 shadow-sm">
          {/* Left Column: Image Slider */}
          <div className="lg:col-span-6">
            <ImageSlider images={product.image} />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
                  SKU: {product.productId}
                </span>
                {inStock ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <FiCheck size={12} /> In Stock ({stock} units)
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                    Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1E18] mt-2">
                {product.productname}
              </h1>

              {/* Alt Names / Tags */}
              {product.altName && product.altName.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.altName.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-[#FAF7F3] text-[#7A6B63] rounded-md border border-[#E5D3B3]/60"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-6 pb-6 border-b border-[#E5D3B3]/60">
                <span className="text-3xl font-serif font-bold text-[#B08D57]">
                  LKR {effectivePrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-gray-400 line-through">
                    LKR {regularPrice.toFixed(2)}
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save {Math.round(((regularPrice - effectivePrice) / regularPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="py-6 border-b border-[#E5D3B3]/60">
                <h3 className="text-xs uppercase tracking-wider text-[#7A6B63] font-semibold mb-2">
                  Description
                </h3>
                <p className="text-sm text-[#4A3B32] leading-relaxed whitespace-pre-line">
                  {product.description || "No description provided for this product."}
                </p>
              </div>

              {/* Quantity Stepper */}
              {inStock && (
                <div className="py-6 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider text-[#7A6B63] font-semibold">
                    Quantity
                  </span>
                  <div className="inline-flex items-center border border-[#E5D3B3] rounded-full bg-[#FAF7F3] shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-[#6B4F3A] hover:text-[#B08D57] transition disabled:opacity-40"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="px-4 text-sm font-semibold text-[#2D1E18]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                      disabled={quantity >= stock}
                      className="p-2 text-[#6B4F3A] hover:text-[#B08D57] transition disabled:opacity-40"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  type="button"
                  onClick={onAddToCartClick}
                  disabled={!inStock}
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#B08D57] hover:bg-[#9A7748] text-white font-semibold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiShoppingBag size={16} /> Add to Cart
                </button>
                <button
                  type="button"
                  onClick={onBuyNowClick}
                  disabled={!inStock}
                  className="flex-1 py-3.5 px-6 rounded-full border-2 border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white font-semibold text-xs uppercase tracking-wider transition disabled:opacity-40 cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E5D3B3]/40 text-xs text-[#7A6B63]">
                <div className="flex items-center gap-2">
                  <FiTruck className="text-[#B08D57]" size={18} />
                  <span>Islandwide Express Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiShield className="text-[#B08D57]" size={18} />
                  <span>100% Authentic Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}