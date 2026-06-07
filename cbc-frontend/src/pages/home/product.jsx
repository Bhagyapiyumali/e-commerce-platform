import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading"); //loaded, loading, error
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }, []);

  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");
    if (query == "") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }else{
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/"+query)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Error loading products"));
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#6d3e1e] via-[#E5D3B3] to-[#6B4F3A] bg-fixed pt-6 px-6">

      {/* ================= SEARCH BAR ================= */}
      <div className="w-full flex justify-center mb-10">
        <div className="relative w-full max-w-2xl">

          <input
            type="text"
            placeholder="Search luxury skincare products..."
            onChange={search}
            value={query}
            className="w-full p-4 pl-12 rounded-full border border-[#E5D3B3] shadow-md 
                       focus:outline-none focus:ring-2 focus:ring-[#B08D57] bg-white"
          />

          <span className="absolute left-4 top-3.5 text-[#B08D57]">
            🔍
          </span>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      {loadingStatus == "loaded" && ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-8 py-8 place-items-center"> 
        {products.map((product) => ( 
          <ProductCard product={product} />
        ))} 
        </div> 
      )} 
      
      {loadingStatus == "loading" && ( 
        <div className="w-full h-full flex items-center justify-center"> 
          <div className="animate-spin rounded-full h-32 w-32 border-2 border-gray-500 border-b-accent border-b-4">
          </div> 
        </div> 
      )}

    </div>
  );
}