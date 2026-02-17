import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { fetchMasterCategories } from '../api/masterCategory.api';
import { fetchCategories } from '../api/Category.api';

export default function CategorySlider() {
  const sliderRefs = useRef({});
  const [scrollProgress, setScrollProgress] = useState({});
  const [masterCategories, setMasterCategories] = useState([]);
  const [categories, setCategories] = useState([]);   
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const [masterResponse, categoryResponse] = await Promise.all([
          fetchMasterCategories(),
          fetchCategories()
        ]);
        
        if (masterResponse.success) {
          // Filter to show only Men and Women categories
          const filtered = masterResponse.data.filter(
            mc => mc.name.toLowerCase() === 'men' || mc.name.toLowerCase() === 'women'
          );
          setMasterCategories(filtered);
        }
        
        if (categoryResponse.success) {
          setCategories(categoryResponse.data);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center">Loading categories...</div>
        </div>
      </section>
    );
  }
  
  if (masterCategories.length === 0) return null;

  const handleScroll = (masterId) => {
    if (sliderRefs.current[masterId]) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRefs.current[masterId];
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(prev => ({ ...prev, [masterId]: progress }));
    }
  };

  const scroll = (direction, masterId) => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    if (sliderRefs.current[masterId]) {
      sliderRefs.current[masterId].scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {masterCategories.map((masterCategory) => {
          const masterCategoryCategories = categories.filter(
            cat => cat.master_category_id === masterCategory.master_category_id && cat.is_active
          );
          
          if (masterCategoryCategories.length === 0) return null;
          
          return (
            <div key={masterCategory.master_category_id} className="mb-16">
              {/* Header */}
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                    Explore <span className="text-red-600">{masterCategory.name}</span>
                  </h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">
                    {masterCategory.name} Collection
                  </p>
                </div>

                {/* Navigation & Progress Bar Container */}
                <div className="flex items-center gap-6">
                  {/* Progress Bar */}
                  <div className="hidden md:block w-32 h-[2px] bg-gray-200 relative rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-red-600 transition-all duration-300 ease-out"
                      style={{ width: `${scrollProgress[masterCategory.master_category_id] || 0}%` }}
                    />
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex gap-1">
                    <button 
                      onClick={() => scroll('left', masterCategory.master_category_id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      onClick={() => scroll('right', masterCategory.master_category_id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories Slider */}
              <div 
                ref={(el) => (sliderRefs.current[masterCategory.master_category_id] = el)}
                onScroll={() => handleScroll(masterCategory.master_category_id)}
                className="category-slider flex gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4"
              >
                {masterCategoryCategories.map((category) => (
                  <Link 
                    key={category.category_id}
                    to={`/shop/${masterCategory.slug}/${category.slug}`}
                    className="flex flex-col items-center min-w-[140px] md:min-w-[180px] group"
                  >
                    <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4">
                      {/* Rotating Border */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 group-hover:border-red-600 group-hover:rotate-45 transition-all duration-700"></div>
                      
                      {/* Category Circle */}
                      <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                        {category.icon_url ? (
                          <img 
                            src={category.icon_url.startsWith('http') ? category.icon_url : `http://localhost:3000${category.icon_url}`}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-black text-gray-200 group-hover:text-red-600/20 transition-colors">
                            {category.name.charAt(0)}
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                      </div>

                      <div className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">
                        <ArrowRight size={14} />
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-[12px] font-black uppercase tracking-widest text-gray-800 group-hover:text-red-600 transition-colors">
                        {category.name}
                      </h4>
                      <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 block group-hover:text-black transition-colors">
                        View Collection
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style >{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}