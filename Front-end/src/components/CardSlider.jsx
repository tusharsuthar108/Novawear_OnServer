import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Star, ArrowUpRight } from "lucide-react";
import { products } from "../data/database";

export default function CardSlider({ badgeType = "trending", customTitle }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const filteredProducts = products.filter(product => product.badgeType === badgeType);
  
  const getTitleByBadgeType = (type) => {
    switch(type) {
      case "trending": return { main: "Trending", sub: "Now" };
      case "bestseller": return { main: "Best", sub: "Sellers" };
      case "new": return { main: "New", sub: "Drops" };
      default: return { main: "Featured", sub: "Products" };
    }
  };
  
  const title = customTitle ? { main: customTitle, sub: "" } : getTitleByBadgeType(badgeType);
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = dir === "left" ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="pt-12 bg-[#F3F4F6] overflow-hidden select-none">
      <div className="max-w-[1440px] mx-auto px-6">
        
        <div className="flex justify-between items-end mb-8">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black tracking-tighter uppercase leading-none text-gray-900">
              {title.main} <span className="text-red-600">{title.sub}</span>
            </h2>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Premium Collection</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block w-32 h-[2px] bg-gray-200 relative rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-red-600 transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <div className="flex gap-1.5">
              <button onClick={() => scroll("left")} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-black hover:text-white transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scroll("right")} className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-black hover:text-white transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={sliderRef} 
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6"
        >
          {filteredProducts.map((product) => {
            const discount = product.discount ? parseInt(product.discount) : Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            return (
              <div key={product.id} className="min-w-[260px] md:min-w-[300px] snap-start group bg-white rounded-[20px] overflow-hidden shadow-[0_8px_20px_-10px_rgba(0,0,0,0.12)] hover:shadow-xl transition-all duration-300">
                
                {/* Image Section - Click goes to Details */}
                <div 
                  onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0,0); }}
                  className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
                >
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded uppercase">
                      {discount}% OFF
                    </span>
                  </div>

                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                    <Heart size={14} className="text-gray-900" />
                  </button>

                  <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.availableSizes[0], 1);
                      }}
                      className="w-full bg-black text-white py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={13} /> Add
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <div 
                      onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0,0); }}
                      className="flex-1 min-w-0 cursor-pointer"
                    >
                      <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-tight truncate pr-1">{product.name}</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.specifications.fabric}</p>
                    </div>
                    <div className="flex items-center gap-0.5 bg-gray-50 px-1.5 py-0.5 rounded">
                      <Star size={9} className="fill-black" />
                      <span className="text-[9px] font-black">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-black leading-none">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-gray-400 line-through font-medium">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <button 
                      onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0,0); }}
                      className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style >{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}