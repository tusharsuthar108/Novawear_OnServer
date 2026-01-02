import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { categories } from "../data/database";

export default function CategorySlider() {
  // Only show Men category
  const menCategory = categories.find(cat => cat.slug === "men");
  const sliderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  if (!menCategory) return null;

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
              Explore <span className="text-red-600">Categories</span>
            </h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">
              {menCategory.name} Collection
            </p>
          </div>

          {/* Navigation & Progress Bar Container */}
          <div className="flex items-center gap-6">
            {/* Progress Bar */}
            <div className="hidden md:block w-32 h-[2px] bg-gray-200 relative rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-red-600 transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-1">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Subcategories Slider */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="category-slider flex gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {menCategory.subCategories.map((sub) => (
            <Link 
              key={sub.id}
              to={`/shop/${menCategory.slug}/${sub.slug}`}
              className="flex flex-col items-center min-w-[140px] md:min-w-[180px] group"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4">
                {/* Rotating Border */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 group-hover:border-red-600 group-hover:rotate-45 transition-all duration-700"></div>
                
                {/* Subcategory Circle */}
                <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-200 group-hover:text-red-600/20 transition-colors">
                    {sub.name.charAt(0)}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>

                <div className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">
                  <ArrowRight size={14} />
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-[12px] font-black uppercase tracking-widest text-gray-800 group-hover:text-red-600 transition-colors">
                  {sub.name}
                </h4>
                <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 block group-hover:text-black transition-colors">
                  View Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}