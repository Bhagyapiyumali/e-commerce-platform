import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setCart(loadCart());
    console.log(loadCart());
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
        orderedItems: loadCart(),
      })
      .then((res) => {
        console.log(loadCart());
        console.log(res.data);
        if(res.data.total != null){
          setTotal(res.data.total);
          setLabeledTotal(res.data.total);
        }
      });
  }, []);

  function onOrderCheckOutClick() {
    navigate("/shipping" ,{
      state: {
        items : loadCart()
      }
    });    
  }

  return (
    <div className="w-full h-full  overflow-y-scroll flex  flex-col items-end">
      <table className="w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        {cart.map((item) => {
          return (
            <CartCard
              key={item.productId}
              productId={item.productId}
              qty={item.qty}
            />
          );
        })}
      </table>

      <div className="mt-8 w-full max-w-md bg-white rounded-2xl shadow-md border border-[#E5D3B3] p-6">

        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <span>Subtotal</span>
          <span>LKR {labeledTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600 text-sm mb-2">
          <span>Discount</span>
          <span>LKR {(labeledTotal - total).toFixed(2)}</span>
        </div>

        <hr className="my-3 border-[#E5D3B3]" />

        <div className="flex justify-between text-lg font-bold text-[#6B4F3A]">
          <span>Grand Total</span>
          <span>LKR {total.toFixed(2)}</span>
        </div>

        <button
          onClick={onOrderCheckOutClick}
          className="mt-6 w-full bg-[#B08D57] hover:bg-[#9A7748] text-[#6B4F3A] py-3 rounded-full transition"
        >
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
}