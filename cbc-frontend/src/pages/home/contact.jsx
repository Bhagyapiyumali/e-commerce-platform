export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-100 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">

        {/* LEFT SIDE - INFO PANEL */}
        <div className="bg-gradient-to-br from-[#99765c] to-[#6d3e1e] text-white p-10 flex flex-col justify-between">

          <div>
            <h2 className="text-3xl font-bold">Get in Touch 💄</h2>
            <p className="mt-3 text-white/90">
              We’re here to help you with skincare, beauty products, orders, and support.
            </p>
          </div>

          <div className="space-y-4 text-sm mt-10">
            <p>📍 Colombo, Sri Lanka</p>
            <p>📧 support@cosmetics.com</p>
            <p>📞 +94 77 123 4567</p>
          </div>

          <div className="mt-10 text-xs text-white/80">
            “Beauty begins the moment you decide to be yourself.”
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-10">

          <h1 className="text-3xl font-bold text-gray-800">
            Contact Us
          </h1>

          <p className="text-gray-500 mt-2">
            We’d love to hear from you ✨
          </p>

          <form className="mt-8 space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-[#d6b36a] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-[#d6b36a] outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                rows="4"
                placeholder="Tell us what you need..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-[#d6b36a] outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#d6b36a] to-[#d6b36a] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Send Message 💌
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}