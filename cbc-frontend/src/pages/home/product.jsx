import axios from "axios";
import { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import { FiSearch, FiRefreshCw, FiSliders } from "react-icons/fi";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); // "loading" | "loaded" | "error"
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchProducts = (searchQuery = "") => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoadingStatus("loading");

    const endpoint = searchQuery.trim()
      ? `${import.meta.env.VITE_BACKEND_URL}/api/products/search/${encodeURIComponent(searchQuery.trim())}`
      : `${import.meta.env.VITE_BACKEND_URL}/api/products`;

    axios
      .get(endpoint, { signal: controller.signal })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
        setLoadingStatus("loaded");
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        toast.error("Error loading products");
        setLoadingStatus("error");
      });
  };

  // Initial load
  useEffect(() => {
    fetchProducts("");
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(query);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // Derived sorted and filtered products
  const displayProducts = useMemo(() => {
    let result = [...products];

    if (onlyInStock) {
      result = result.filter((p) => Number(p.stock) > 0);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "name") {
      result.sort((a, b) =>
        (a.productname || "").localeCompare(b.productname || "")
      );
    }

    return result;
  }, [products, sortBy, onlyInStock]);

  return (
    <div className="min-h-screen w-full bg-[#FAF7F3] text-[#2D1E18] pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      {/* ================= PAGE HEADER & SEARCH ================= */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold">
            Radiant Skincare Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D1E18] mt-1">
            Our Products
          </h1>
          <p className="text-sm text-[#7A6B63] max-w-xl mx-auto mt-2">
            Formulated with the purest botanical extracts and proven actives for timeless, glowing skin.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-center mb-6">
          <div className="relative w-full max-w-2xl">
            <FiSearch className="absolute left-4 top-3.5 text-[#B08D57]" size={20} />
            <input
              type="text"
              placeholder="Search by product name, ingredient, or SKU..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3.5 pl-12 pr-4 rounded-full border border-[#E5D3B3] shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:border-[#B08D57] 
                         bg-white text-[#2D1E18] placeholder:text-gray-400 text-sm transition"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-3 text-xs text-gray-400 hover:text-gray-600 px-2 py-0.5 rounded-full"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-white/70 backdrop-blur-sm rounded-xl border border-[#E5D3B3]/60 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#7A6B63]">
            <FiSliders className="text-[#B08D57]" />
            <span>
              Showing <strong className="text-[#2D1E18]">{displayProducts.length}</strong> items
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#6B4F3A]">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded accent-[#B08D57] cursor-pointer"
              />
              <span>In-stock only</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[#7A6B63]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1 px-2.5 rounded-lg border border-[#E5D3B3] bg-white text-[#2D1E18] focus:outline-none focus:ring-1 focus:ring-[#B08D57]"
              >
                <option value="default">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT STATES ================= */}
      <div className="max-w-6xl mx-auto">
        {loadingStatus === "loading" && products.length === 0 && (
          <div className="w-full py-24 flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-[#E5D3B3] border-t-[#B08D57]"></div>
            <p className="text-sm text-[#7A6B63]">Loading premium collection...</p>
          </div>
        )}

        {loadingStatus === "error" && (
          <div className="w-full py-16 text-center bg-white rounded-2xl border border-red-200 p-8 shadow-xs">
            <p className="text-red-700 font-medium mb-3">
              Unable to load products at this time.
            </p>
            <button
              onClick={() => fetchProducts(query)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B08D57] text-white hover:bg-[#9A7748] text-xs font-semibold tracking-wider uppercase transition"
            >
              <FiRefreshCw /> Try Again
            </button>
          </div>
        )}

        {loadingStatus !== "error" && displayProducts.length === 0 && loadingStatus !== "loading" && (
          <div className="w-full py-20 text-center bg-white rounded-2xl border border-[#E5D3B3] p-8 shadow-xs">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FAF7F3] flex items-center justify-center text-[#B08D57] text-2xl">
              <FiSearch />
            </div>
            <h3 className="text-lg font-semibold text-[#2D1E18]">
              No products found
            </h3>
            <p className="text-sm text-[#7A6B63] mt-1 max-w-sm mx-auto">
              We couldn't find any products matching &ldquo;{query}&rdquo;. Try another search term or reset filters.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setOnlyInStock(false);
                setSortBy("default");
              }}
              className="mt-5 px-5 py-2 rounded-full border border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white text-xs font-medium transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        {displayProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-stretch">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.productId || product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}