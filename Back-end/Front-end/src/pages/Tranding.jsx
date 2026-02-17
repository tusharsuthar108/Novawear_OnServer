import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../components/Navbar";

/* ================= INTRO IMAGES ================= */
const introLeftImage =
  "https://plus.unsplash.com/premium_photo-1755958633015-88468df264e2?q=80&w=387&auto=format&fit=crop";

const introRightImage =
  "https://plus.unsplash.com/premium_photo-1669688174622-0393f5c6baa2?q=80&w=464&auto=format&fit=crop";

/* ================= CATEGORIES ================= */
const categories = [
  {
    title: "Summer Essentials",
    description: "Lightweight fabrics and bold silhouettes for warm days.",
    image:
      "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Autumn Layers",
    description: "Transitional pieces crafted for modern elegance.",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Winter Collection",
    description: "Premium outerwear and rich textures for cold seasons.",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Spring Edit",
    description: "Fresh tones and clean tailoring for a new beginning.",
    image:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Men's Collection",
    description: "Timeless menswear with a modern, tailored fit.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Tranding() {
  const wrapperRef = useRef(null);
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  /* ================= SMOOTH SCROLL ================= */
  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      targetProgress.current = scrolled / total;
    };

    const animate = () => {
      smoothProgress.current +=
        (targetProgress.current - smoothProgress.current) * 0.05; // Slower for more weight

      setProgress(smoothProgress.current);

      if (smoothProgress.current > 0.65) {
        const idx = Math.min(
          categories.length - 1,
          Math.floor(
            ((smoothProgress.current - 0.65) / 0.35) * categories.length
          )
        );
        setCategoryIndex(idx);
      } else {
        setCategoryIndex(0); // Reset or keep visible
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ================= PANEL MOTION ================= */
  const panelTranslate =
    progress < 0.25
      ? "0%"
      : progress <= 0.5
        ? `-${((progress - 0.25) / 0.25) * 100}%`
        : "-100%";

  const exploreStart = 0.375;
  const exploreEnd = 0.5;

  const exploreProgress = Math.min(
    Math.max((progress - exploreStart) / (exploreEnd - exploreStart), 0),
    1
  );

  const exploreTranslateY = `${(1 - exploreProgress) * 100}%`;

  /* ================= RENDER ================= */
  return (
    <>
      {/* <Navbar /> */}
      <div ref={wrapperRef} className=" py-6 relative h-[500vh] bg-gray-50">
        <section className="sticky top-[15.5vh] h-[85vh] w-[95%] max-w-[1400px] mx-auto overflow-hidden rounded-3xl shadow-2xl border border-white/20">

          {/* LEFT IMAGE */}
          <div className="absolute inset-y-0 left-0 w-1/2 z-10">
            <img src={introLeftImage} className="h-full w-full object-cover" />
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 z-20"
            style={{ transform: `translateX(${panelTranslate})` }}
          >
            <img src={introRightImage} className="h-full w-full object-cover" />
          </div>

          {/* CATEGORY IMAGE */}
          <div className="absolute left-0 top-0 h-full w-1/2 z-30 overflow-hidden bg-white">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                  transform:
                    index === categoryIndex
                      ? "translateY(0%)"
                      : index < categoryIndex
                        ? "translateY(-100%)"
                        : "translateY(100%)",
                  opacity: index === categoryIndex ? 1 : 0,
                }}
              >
                <img src={cat.image} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          {/* ================= EXPLORE PANEL ================= */}
          <div
            className="absolute bottom-0 right-0 h-full w-1/2 bg-white z-40 flex items-center"
            style={{
              transform: `translateY(${exploreTranslateY})`,
              opacity: exploreProgress,
            }}
          >
            <div className="px-14 max-w-xl space-y-6">

              {/* FIXED TAGLINE */}
              <p className="uppercase tracking-widest text-sm text-gray-400">
                Crafted for Modern Living
              </p>

              {/* FIXED HEADLINE */}
              <h3 className="text-xl font-medium text-gray-800">
                Timeless Design · Premium Materials · Conscious Craft
              </h3>

              {/* DYNAMIC CATEGORY TITLE */}
              <h2 className="text-5xl font-semibold leading-tight">
                {categories[categoryIndex].title}
              </h2>

              {/* DYNAMIC DESCRIPTION */}
              <p className="text-gray-600 leading-relaxed">
                {categories[categoryIndex].description}
              </p>

              {/* FIXED BRAND STORY */}
              <p className="text-gray-400 text-sm leading-relaxed">
                Each collection is thoughtfully curated to balance modern trends
                with enduring style. Designed with precision, made to be worn
                beyond seasons.
              </p>

              {/* CTA */}
              <button className="mt-4 border border-black px-8 py-3 uppercase tracking-wide hover:bg-black hover:text-white transition-all">
                Shop Collection
              </button>
            </div>
          </div>

        </section>
      </div>
    </>

  );
}
