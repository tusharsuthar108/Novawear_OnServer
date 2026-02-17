import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ads = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    title: 'Women\'s Fashion Sale',
    subtitle: 'Up to 50% OFF',
    bgColor: 'from-pink-500 to-rose-600'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
    title: 'New Arrivals',
    subtitle: 'Exclusive Collection',
    bgColor: 'from-purple-500 to-indigo-600'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
    title: 'Summer Collection',
    subtitle: 'Flat 40% OFF',
    bgColor: 'from-orange-500 to-red-600'
  }
];

export default function AdBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % ads.length);
  const prev = () => setCurrent((prev) => (prev - 1 + ads.length) % ads.length);

  return (
    <section className="py-8">
      <div className="w-full">
        <div className="relative h-[300px] md:h-[400px] overflow-hidden group">
          {ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-center bg-black/20">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                    {ad.title}
                  </h2>
                  <p className="text-xl md:text-3xl font-bold text-white/90">
                    {ad.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
