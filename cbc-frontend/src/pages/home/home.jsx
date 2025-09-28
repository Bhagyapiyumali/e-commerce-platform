import { motion } from "framer-motion";
import {
  FaLeaf,
  FaStar,
  FaShippingFast,
  FaLock,
  FaInstagram,
} from "react-icons/fa";

export default function HomeWebPage() {
  return (
    <div className="bg-[#FAF7F3] text-[#3B2F2F]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[90vh] flex items-center justify-center text-center bg-gradient-to-r from-[#3B2F2F] to-[#6B4F3A] text-white px-6">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold">
            Luxury Skincare for Natural Glow ✨
          </h1>

          <p className="mt-5 text-[#F5E6D3]">
            Discover premium cosmetics crafted with natural ingredients and
            modern science.
          </p>

          <div className="mt-6 flex gap-4 justify-center">
            <button className="px-6 py-3 bg-[#B08D57] rounded-full text-[#B08D57] hover:bg-[#9A7748] transition">
              Shop Now
            </button>

            <button className="px-6 py-3 border border-white rounded-full hover:bg-white text-[#B08D57] hover:text-black transition">
              Explore
            </button>
          </div>
        </motion.div>
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

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.03 }}
              className="bg-[#FAF7F3] p-5 rounded-xl shadow-md border border-[#E5D3B3]"
            >
              <div className="h-40 bg-[#E5D3B3] rounded-lg mb-4"></div>

              <h3 className="font-semibold">Glow Serum {item}</h3>
              <p className="text-sm text-gray-500">Hydrating skincare serum</p>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-[#B08D57]">Rs. 3,500</span>
                <button className="px-3 py-1 bg-[#6B4F3A] text-white rounded-full text-sm">
                  Add
                </button>
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

        <button className="mt-6 px-6 py-3 text-[#B08D57] bg-[#B08D57] rounded-full hover:bg-[#9A7748] transition">
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

          <button className="px-6 py-3 text-[#B08D57] bg-[#B08D57] rounded-full">
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