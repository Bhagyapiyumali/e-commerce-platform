import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeImage, setActiveImage] = useState(0);

  const imageList = Array.isArray(images) && images.length > 0 
    ? images 
    : ["/placeholder-product.png"];

  const current = imageList[activeImage] || imageList[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Image Frame */}
      <div className="w-full aspect-square bg-[#FAF7F3] rounded-2xl overflow-hidden border border-[#E5D3B3] shadow-xs relative">
        <img
          src={current}
          alt="Product showcase"
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnails */}
      {imageList.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
          {imageList.map((img, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                activeImage === index
                  ? "border-[#B08D57] shadow-sm scale-105"
                  : "border-[#E5D3B3] opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}