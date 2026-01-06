import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// Modern Dummy Data
const DATA = [
  { id: 1, name: 'Technology', icon: '💻', image: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=Tech', items: ['AI Tools', 'Hardware', 'Software', 'Cloud'] },
  { id: 2, name: 'Design', icon: '🎨', image: 'https://via.placeholder.com/150/EC4899/FFFFFF?text=Design', items: ['UI/UX', 'Branding', 'Motion', 'Typography'] },
  { id: 3, name: 'Marketing', icon: '📈', image: 'https://via.placeholder.com/150/10B981/FFFFFF?text=Marketing', items: ['SEO', 'Social Media', 'Ads', 'Analytics'] },
  { id: 4, name: 'Fitness', icon: '🏃', image: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=Fitness', items: ['Yoga', 'Gym', 'Nutrition', 'Supplements'] },
{ id: 1, name: 'Technology', icon: '💻', image: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=Tech', items: ['AI Tools', 'Hardware', 'Software', 'Cloud'] },
  { id: 2, name: 'Design', icon: '🎨', image: 'https://via.placeholder.com/150/EC4899/FFFFFF?text=Design', items: ['UI/UX', 'Branding', 'Motion', 'Typography'] },
  { id: 3, name: 'Marketing', icon: '📈', image: 'https://via.placeholder.com/150/10B981/FFFFFF?text=Marketing', items: ['SEO', 'Social Media', 'Ads', 'Analytics'] },
  { id: 4, name: 'Fitness', icon: '🏃', image: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=Fitness', items: ['Yoga', 'Gym', 'Nutrition', 'Supplements'] },
{ id: 1, name: 'Technology', icon: '💻', image: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=Tech', items: ['AI Tools', 'Hardware', 'Software', 'Cloud'] },
  { id: 2, name: 'Design', icon: '🎨', image: 'https://via.placeholder.com/150/EC4899/FFFFFF?text=Design', items: ['UI/UX', 'Branding', 'Motion', 'Typography'] },
  { id: 3, name: 'Marketing', icon: '📈', image: 'https://via.placeholder.com/150/10B981/FFFFFF?text=Marketing', items: ['SEO', 'Social Media', 'Ads', 'Analytics'] },
  { id: 4, name: 'Fitness', icon: '🏃', image: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=Fitness', items: ['Yoga', 'Gym', 'Nutrition', 'Supplements'] },
{ id: 1, name: 'Technology', icon: '💻', image: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=Tech', items: ['AI Tools', 'Hardware', 'Software', 'Cloud'] },
  { id: 2, name: 'Design', icon: '🎨', image: 'https://via.placeholder.com/150/EC4899/FFFFFF?text=Design', items: ['UI/UX', 'Branding', 'Motion', 'Typography'] },
  { id: 3, name: 'Marketing', icon: '📈', image: 'https://via.placeholder.com/150/10B981/FFFFFF?text=Marketing', items: ['SEO', 'Social Media', 'Ads', 'Analytics'] },
  { id: 4, name: 'Fitness', icon: '🏃', image: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=Fitness', items: ['Yoga', 'Gym', 'Nutrition', 'Supplements'] },

];

export default function CategoryExplorer() {
  const [active, setActive] = useState(DATA[0]);
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    const navbar = document.querySelector('nav, header, .navbar');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <div 
      className="w-full max-w-[1440px] mx-auto px-6 space-y-4" 
      style={{ 
        height: `calc(100vh - ${navbarHeight + 40}px)`, 
        marginTop: `${navbarHeight + 20}px` 
      }}
    >
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div className="w-full text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            Explore <span className="text-blue-600">Top Wear</span> <span className="text-red-600">Categories</span>
          </h2>
          <p className="text-sm text-gray-600 font-medium tracking-wide mt-8">
            Men / Top Wear
          </p>
        </div>
      </div>
      
      {/* 1. THE CATEGORY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        {DATA.map((cat, index) => (
          <button
            key={`${cat.id}-${index}`}
            onClick={() => setActive(cat)}
            className="flex flex-col items-center group"
          >
            <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 group-hover:border-red-600 group-hover:rotate-45 transition-all duration-700"></div>
              
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                <img 
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              </div>

              <div className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">
                <ArrowRight size={14} />
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-gray-800 group-hover:text-red-600 transition-colors">
                {cat.name}
              </h4>
              <span className="text-[9px] text-gray-400 font-bold uppercase mt-1 block group-hover:text-black transition-colors">
                View Collection
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}