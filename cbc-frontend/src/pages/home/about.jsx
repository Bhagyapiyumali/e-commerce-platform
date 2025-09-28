import { motion } from "framer-motion";
import { FaLeaf, FaAward, FaHeart, FaSpa } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F3] text-[#3B2F2F]">

      {/* HERO SECTION */}
      <div className="relative flex items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-[#3B2F2F] to-[#6B4F3A] text-white">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold tracking-wide">
            About Our Beauty Brand
          </h1>

          <p className="mt-6 text-lg text-[#F5E6D3]">
            Luxury skincare inspired by nature, crafted with care, and designed
            to bring out your natural glow.
          </p>
        </motion.div>
      </div>

      {/* STORY SECTION */}
      <div className="max-w-5xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#6B4F3A]">
            Our Story
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            We believe beauty is not about perfection — it's about confidence.
            Our skincare products are carefully developed using natural
            ingredients to nourish your skin and enhance your natural glow.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            From small beginnings to a trusted skincare brand, we focus on
            quality, purity, and results you can see and feel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#6B4F3A] rounded-2xl p-8 text-white shadow-xl"
        >
          <h3 className="text-2xl font-semibold">Glow Naturally ✨</h3>
          <p className="mt-4 text-[#F5E6D3]">
            Skincare that respects your skin barrier and enhances natural beauty.
          </p>
        </motion.div>

      </div>

      {/* VALUES SECTION */}
      <div className="bg-white py-20 px-6">
        <h2 className="text-center text-3xl font-bold text-[#6B4F3A] mb-12">
          Why Choose Us
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">

          {[
            {
              icon: <FaLeaf />,
              title: "Natural",
              desc: "Pure botanical ingredients",
            },
            {
              icon: <FaAward />,
              title: "Premium",
              desc: "High-quality formulations",
            },
            {
              icon: <FaHeart />,
              title: "Loved",
              desc: "Trusted by customers",
            },
            {
              icon: <FaSpa />,
              title: "Care",
              desc: "Gentle on all skin types",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-[#FAF7F3] p-6 rounded-xl shadow-md text-center border border-[#E5D3B3]"
            >
              <div className="text-3xl text-[#B08D57] flex justify-center">
                {item.icon}
              </div>
              <h3 className="mt-4 font-bold text-[#3B2F2F]">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="py-20 text-center bg-gradient-to-r from-[#6B4F3A] to-[#3B2F2F] text-white px-6">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">
            Discover Your Natural Glow
          </h2>

          <p className="mt-4 text-[#F5E6D3]">
            Experience skincare designed for elegance, purity, and confidence.
          </p>

          <button className="mt-6 px-6 py-3 bg-[#B08D57] hover:bg-[#9A7748] text-[#B08D57] rounded-full transition">
            Shop Now
          </button>
        </motion.div>

      </div>

    </div>
  );
}