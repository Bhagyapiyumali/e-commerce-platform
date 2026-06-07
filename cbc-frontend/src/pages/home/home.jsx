import { motion } from "framer-motion";
import {
  FaLeaf,
  FaStar,
  FaShippingFast,
  FaLock,
  FaInstagram,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomeWebPage() {
  const navigate = useNavigate();

  const bestSellers = [
  {
    name: "Hydrating Face Serum",
    description: "Deep hydration for glowing skin",
    price: "Rs. 3,500",
    image: "/best1.jpg",
  },
  {
    name: "Vitamin C Cream",
    description: "Brightens and evens skin tone",
    price: "Rs. 4,200",
    image: "/best2.jpg",
  },
  {
    name: "Rose Water Toner",
    description: "Refreshes and soothes skin",
    price: "Rs. 2,900",
    image: "/best3.jpg",
  },
  {
    name: "Night Repair Cream",
    description: "Nourishes while you sleep",
    price: "Rs. 4,800",
    image: "/best4.jpg",
  },
  {
    name: "Luxury Face Mask",
    description: "Instant glow and hydration",
    price: "Rs. 3,900",
    image: "/best5.jpg",
  },
  {
    name: "Gentle Cleanser",
    description: "Daily cleansing for healthy skin",
    price: "Rs. 2,500",
    image: "/best6.jpg",
  },
];

  return (
    <div className="bg-[#FAF7F3] text-[#3B2F2F]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[90vh]">

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          className="h-full"
        >

          {[
            "/hero1.avif",
            "/hero2.avif",
            "/hero3.jpg",
            "/hero4.avif",
            "/hero5.png",
          ].map((image, index) => (
            <SwiperSlide key={index}>

              <div
                className="h-[90vh] bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${image})`,
                }}
              >

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">

                  <h1 className="text-5xl md:text-7xl font-bold">
                    Luxury Beauty Collection
                  </h1>

                  <p className="mt-6 text-lg max-w-2xl">
                    Premium skincare and cosmetics designed for radiant confidence.
                  </p>

                  <button 
                    className="mt-8 px-8 py-3 text-[#6B4F3A] bg-[#B08D57] rounded-full hover:bg-[#9A7748] transition"
                    onClick={() => navigate("/products")}
                  >
                    Shop Now
                  </button>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-[#6B4F3A] mb-10">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {["Skincare", "Makeup", "Haircare", "Body Care"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md border border-[#E5D3B3]"
            >
              <div className="h-16 w-16 mx-auto bg-[#FAF7F3] rounded-full flex items-center justify-center text-[#B08D57] text-xl">
                <FaLeaf />
              </div>
              <h3 className="mt-4 font-semibold">{item}</h3>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-20 bg-white px-6">

        <h2 className="text-center text-3xl font-bold text-[#6B4F3A] mb-12">
          Best Sellers
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          {bestSellers.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-[#FAF7F3] rounded-2xl overflow-hidden shadow-md border border-[#E5D3B3]"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">

                <h3 className="font-bold text-xl text-[#6B4F3A]">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-5">

                  <span className="font-bold text-xl text-[#B08D57]">
                    {item.price}
                  </span>

                  <button className="px-4 py-2 bg-[#6B4F3A] text-[#B08D57] rounded-full hover:bg-[#B08D57] transition">
                    Add
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </section>

      {/* ================= PROMO BANNER ================= */}
      <section className="py-16 bg-gradient-to-r from-[#6B4F3A] to-[#3B2F2F] text-white text-center px-6">

        <h2 className="text-3xl font-bold">🔥 20% OFF First Order</h2>
        <p className="mt-3 text-[#F5E6D3]">
          Limited time luxury skincare offer
        </p>

        <button className="mt-6 px-6 py-3 text-[#B08D57] bg-[#B08D57] rounded-full hover:text-[#6B4F3A] hover:bg-[#9A7748] transition">
          Grab Offer
        </button>

      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-[#6B4F3A] mb-10">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {[
            { icon: <FaLeaf />, text: "Natural Ingredients" },
            { icon: <FaStar />, text: "Premium Quality" },
            { icon: <FaShippingFast />, text: "Fast Delivery" },
            { icon: <FaLock />, text: "Secure Payment" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-xl shadow border border-[#E5D3B3]"
            >
              <div className="text-2xl text-[#B08D57] flex justify-center">
                {item.icon}
              </div>
              <p className="mt-3 font-medium">{item.text}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= BRAND STORY ================= */}
      <section className="py-20 bg-[#FAF7F3] px-6">

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-bold text-[#6B4F3A]">
              Our Beauty Philosophy
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We believe skincare should be luxurious yet natural. Our products
              are designed to enhance your beauty while caring for your skin
              deeply.
            </p>
          </div>

          <div className="bg-[#6B4F3A] text-white p-10 rounded-2xl">
            <h3 className="text-xl font-bold">Pure. Elegant. Effective.</h3>
            <p className="mt-3 text-[#F5E6D3]">
              Crafted for glowing confidence.
            </p>
          </div>

        </div>
      </section>


      {/* ================= NEWSLETTER ================= */}
      <section className="py-20 bg-[#6B4F3A] text-white text-center px-6">

        <h2 className="text-3xl font-bold">
          Join Our Beauty Community
        </h2>

        <p className="mt-3 text-[#F5E6D3]">
          Get offers & skincare tips
        </p>

        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full bg-[#ffffff] text-black w-64"
          />

          <button className="px-6 py-3 text-[#B08D57] hover:text-[#6B4F3A] bg-[#B08D57] rounded-full">
            Subscribe
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 text-center bg-[#3B2F2F] text-white">

        <p>© 2026 Luxury Cosmetics. All rights reserved.</p>

        <div className="flex justify-center gap-4 mt-4 text-xl">
          <FaInstagram />
        </div>

      </footer>

    </div>
  );
}