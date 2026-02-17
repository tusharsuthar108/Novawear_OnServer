import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function MenAdBanner() {
  return (
    <section className="py-8">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="relative h-[400px] overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800"
              alt="Men's Casual Wear"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-sm font-bold text-white/80 uppercase tracking-widest mb-2">New Collection</p>
              <h3 className="text-4xl font-black text-white uppercase mb-4">Casual Wear</h3>
              <button className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase text-sm hover:bg-black hover:text-white transition-all">
                Shop Now <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative h-[400px] overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800"
              alt="Men's Formal Wear"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-sm font-bold text-white/80 uppercase tracking-widest mb-2">Premium Quality</p>
              <h3 className="text-4xl font-black text-white uppercase mb-4">Formal Wear</h3>
              <button className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase text-sm hover:bg-black hover:text-white transition-all">
                Shop Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
