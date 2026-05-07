import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link
  to={`/productInfo/${product.productId}`}
  className="
    w-[300px]
    bg-white
    rounded-2xl
    overflow-hidden
    border border-[#E5D3B3]
    shadow-md
    hover:shadow-xl
    hover:-translate-y-1
    transition-all duration-300
  "
>

  {/* Image */}
  <div className="overflow-hidden">
    <img
      src={product.image?.[0]}
      alt={product.productname}
      className="h-[220px] w-full object-cover hover:scale-105 transition duration-500"
    />
  </div>

  {/* Details */}
  <div className="p-5">

    <h2 className="text-xl font-semibold text-[#6B4F3A] text-center">
      {product.productname}
    </h2>

    <p className="text-center text-xs text-gray-400 mt-1">
      {product.productId}
    </p>

    <div className="mt-4 text-center">
      <span className="text-3xl font-bold text-[#B08D57]">
        LKR {product.price.toFixed(2)}
      </span>
    </div>

    <button
      className="
        w-full
        mt-5
        py-3
        rounded-full
        bg-[#B08D57]
        text-[#6B4F3A]
        font-medium
        hover:bg-[#9A7748]
        transition
      "
    >
      View Product
    </button>

  </div>

</Link>
  );
}