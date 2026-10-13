import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (!product) return null;

  const regularPrice = Math.max(Number(product.price) || 0, Number(product.lastPrice) || 0);
  const salePrice = Math.min(Number(product.price) || 0, Number(product.lastPrice) || 0);
  const effectivePrice = salePrice > 0 ? salePrice : regularPrice;
  const hasDiscount = regularPrice > effectivePrice && effectivePrice > 0;
  const stock = Number(product.stock) || 0;

  return (
    <Link
      to={`/productInfo/${product.productId}`}
      className="group w-full h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E5D3B3] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF7F3]">
        <img
          src={product.image?.[0] || "/placeholder-product.png"}
          alt={product.productname || "Skincare Product"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#B08D57] text-white shadow-xs">
              Save {Math.round(((regularPrice - effectivePrice) / regularPrice) * 100)}%
            </span>
          )}
          {stock <= 5 && stock > 0 && (
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Only {stock} left
            </span>
          )}
          {stock === 0 && (
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-red-100 text-red-700 border border-red-200">
              Out of stock
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow justify-between text-center">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#7A6B63] block">
            SKU: {product.productId}
          </span>

          <h2 className="text-base font-semibold text-[#2D1E18] mt-1 group-hover:text-[#B08D57] transition line-clamp-2">
            {product.productname}
          </h2>

          {product.altName && product.altName.length > 0 && (
            <p className="text-xs text-[#7A6B63] mt-1 line-clamp-1 italic">
              {Array.isArray(product.altName) ? product.altName.join(" • ") : product.altName}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#E5D3B3]/40">
          {/* Price Presentation */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-bold text-[#B08D57]">
              LKR {effectivePrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                LKR {regularPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            className="w-full mt-3 py-2.5 rounded-full bg-[#B08D57] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#9A7748] transition shadow-xs group-hover:shadow-md"
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}