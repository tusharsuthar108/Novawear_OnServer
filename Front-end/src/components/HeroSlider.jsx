import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDE_DURATION = 5000;

const slides = [
  {
    badge: "MEN'S COLLECTION 2025",
    title: "TIMELESS MEN'S ESSENTIALS",
    subtitle: "Elevated everyday wear crafted for modern men.",
    cta: "Shop Menswear",
    link: "/mens",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=2070&auto=format&fit=crop",
    position: "object-center",
  },
  {
    badge: "NEW ARRIVALS",
    title: "MODERN STREET STYLE",
    subtitle: "Minimal silhouettes with bold urban attitude.",
    cta: "Explore Streetwear",
    link: "/mens/street",
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=2040&auto=format&fit=crop",
    position: "object-top",
  },
  {
    badge: "PREMIUM FORMALS",
    title: "REFINED FORMAL WEAR",
    subtitle: "Sharp tailoring designed for confidence and class.",
    cta: "Shop Formals",
    link: "/mens/formal",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2071&auto=format&fit=crop",
    position: "object-center",
  },
  {
    badge: "WINTER ESSENTIALS",
    title: "LUXURY OUTERWEAR",
    subtitle: "Jackets and coats built for style and warmth.",
    cta: "View Outerwear",
    link: "/mens/outerwear",
    image:
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=2070&auto=format&fit=crop",
    position: "object-center",
  },
];

export default function HeroBanner() {
  const totalSlides = useMemo(() => slides.length, []);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActive((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  // Auto play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide, paused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ height: 'calc(100vh - 80px)', marginTop: '80px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
    >
      {/* Background */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            active === i ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[6000ms] ${
              active === i ? "scale-110" : "scale-100"
            } ${slide.position}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl text-white">
            {/* Badge */}
            <span
              key={active}
              className="inline-block mb-4 text-xs tracking-[0.35em] uppercase font-bold animate-fade-in"
            >
              {slides[active].badge}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-7xl font-light leading-[1.1] mb-6">
              {slides[active].title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-3 animate-slide-up"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 max-w-md mb-10 font-light leading-relaxed animate-fade-in">
              {slides[active].subtitle}
            </p>

            {/* CTA */}
            <a
              href={slides[active].link}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              {slides[active].cta}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-6 md:right-12 z-30 flex gap-4">
        <button
          aria-label="Previous Slide"
          onClick={prevSlide}
          className="p-3 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Next Slide"
          onClick={nextSlide}
          className="p-3 border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] flex bg-white/10 z-30">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 overflow-hidden">
            {active === i && (
              <div
                className="h-full bg-white origin-left animate-progress"
                style={{ animationDuration: `${SLIDE_DURATION}ms` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-progress {
          animation: progress linear forwards;
        }
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideUp {
          from {
            transform: translateY(120%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}