import React, { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const [sort, setSort] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const itemsPerPage = 30;

  // Sticky Sidebar Logic
  const sidebarRef = useRef(null);
  const [stickyStyle, setStickyStyle] = useState({ top: "6rem" });

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const calculateStyle = () => {
      const height = sidebar.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;

      // If sidebar is taller than viewport (considering some header buffer),
      // we stick it such that the bottom is visible.
      // Logic: position: sticky; top: - (height - viewport + padding)
      // This allows scrolling down until the bottom is visible, then it sticks.
      if (height > viewportHeight - 100) {
        // We want the bottom to be ~32px (2rem) from the viewport bottom
        const topOffset = viewportHeight - height - 32;
        setStickyStyle({ top: `${topOffset}px` });
      } else {
        // Short sidebar: stick to top
        setStickyStyle({ top: "6rem" });
      }
    };

    // Use ResizeObserver to handle content changes or loading
    const observer = new ResizeObserver(calculateStyle);
    observer.observe(sidebar);

    window.addEventListener("resize", calculateStyle);
    calculateStyle(); // Initial

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateStyle);
    };
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen font-sans py-6">
        <div className="max-w-[1440px] mx-auto px-6 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-8">
            <a href="#" className="hover:text-black transition">Home</a>
            <span>/</span>
            <a href="#" className="hover:text-black transition">Clothing</a>
            <span>/</span>
            <span className="text-black font-semibold">Men Topwear</span>
          </nav>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Shop By Category</h1>
              <p>{products.length} Items</p>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 md:hidden border px-4 py-2 rounded-full bg-white text-sm font-medium shadow-sm"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <div className="relative inline-block text-left">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-full text-sm font-medium focus:ring-1 focus:ring-black focus:border-black outline-none transition cursor-pointer hover:border-gray-300"
                >
                  <option value="recommended">Recommended</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="new">What's New</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" size={14} />
              </div>
            </div>
          </div>

          {/* Mobile Filter Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 md:hidden ">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
              <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl ">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={24} />
                  </button>
                </div>
                <div className="overflow-y-auto h-full pb-24 p-4 space-y-8">
                  {/* Categories */}
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Categories</h3>
                    <div className="space-y-3">
                      {["Tshirts", "Shirts", "Kurtas", "Sweatshirts", "Jackets", "Blazers"].map((item) => (
                        <label key={item} className="flex items-center group cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                          <span className="ml-3 text-sm text-gray-600">{item}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="h-px bg-gray-100 w-full" />

                  {/* Brand */}
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Brand</h3>
                    <div className="space-y-3">
                      {["Roadster", "HIGHLANDER", "WROGN", "Mast & Harbour", "H&M"].map((brand) => (
                        <label key={brand} className="flex items-center group cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black w-4 h-4" />
                          <span className="ml-3 text-sm text-gray-600">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="h-px bg-gray-100 w-full" />

                  {/* Price */}
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Price</h3>
                    <div className="space-y-3">
                      {["Rs. 500 to Rs. 1000", "Rs. 1000 to Rs. 2000", "Rs. 2000 to Rs. 5000", "Rs. 5000 +"].map((price) => (
                        <label key={price} className="flex items-center group cursor-pointer">
                          <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black w-4 h-4" />
                          <span className="ml-3 text-sm text-gray-600">{price}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="h-px bg-gray-100 w-full" />

                  {/* Colors */}
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Colors</h3>
                    <div className="flex flex-wrap gap-3">
                      {["bg-black", "bg-white border", "bg-blue-600", "bg-red-500", "bg-green-600", "bg-yellow-400", "bg-pink-500", "bg-gray-500"].map((color, idx) => (
                        <button key={idx} className={`w-6 h-6 rounded-full shadow-sm ${color} ring-1 ring-offset-1 ring-transparent`}></button>
                      ))}
                    </div>
                  </section>

                  <div className="h-px bg-gray-100 w-full" />

                  {/* Sizes */}
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Size</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <button key={size} className="border border-gray-200 rounded py-2 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition">
                          {size}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-black text-white py-3 rounded-lg font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-12">
            {/* Sidebar Filters - Desktop */}
            <aside
              ref={sidebarRef}
              style={stickyStyle}
              className="hidden md:block w-64 flex-shrink-0 space-y-10 sticky self-start"
            >

              {/* Categories */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Categories</h3>
                <div className="space-y-3">
                  {["Tshirts", "Shirts", "Kurtas", "Sweatshirts", "Jackets", "Blazers"].map((item) => (
                    <label key={item} className="flex items-center group cursor-pointer">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer w-4 h-4 rounded border-gray-300 text-black focus:ring-black transition" />
                      </div>
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-black transition">{item}</span>
                    </label>
                  ))}
                </div>
              </section>

              <div className="h-px bg-gray-100 w-full" />

              {/* Brand */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Brand</h3>
                <div className="space-y-3">
                  {["Roadster", "HIGHLANDER", "WROGN", "Mast & Harbour", "H&M"].map((brand) => (
                    <label key={brand} className="flex items-center group cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black w-4 h-4" />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-black transition">{brand}</span>
                    </label>
                  ))}
                </div>
              </section>

              <div className="h-px bg-gray-100 w-full" />

              {/* Price */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Price</h3>
                <div className="space-y-3">
                  {["Rs. 500 to Rs. 1000", "Rs. 1000 to Rs. 2000", "Rs. 2000 to Rs. 5000", "Rs. 5000 +"].map((price) => (
                    <label key={price} className="flex items-center group cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black w-4 h-4" />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-black transition">{price}</span>
                    </label>
                  ))}
                </div>
              </section>

              <div className="h-px bg-gray-100 w-full" />

              {/* Colors */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {["bg-black", "bg-white border", "bg-blue-600", "bg-red-500", "bg-green-600", "bg-yellow-400", "bg-pink-500", "bg-gray-500"].map((color, idx) => (
                    <button key={idx} className={`w-6 h-6 rounded-full shadow-sm hover:scale-110 transition ${color} cursor-pointer ring-1 ring-offset-1 ring-transparent hover:ring-gray-300`}></button>
                  ))}
                </div>
              </section>

              <div className="h-px bg-gray-100 w-full" />

              {/* Sizes */}
              <section>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-5">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button key={size} className="border border-gray-200 rounded py-2 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition">
                      {size}
                    </button>
                  ))}
                </div>
              </section>

            </aside>

            {/* Products Grid & Pagination */}
            <main className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {currentItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.images[0]}
                    brand={product.brand}
                    title={product.title}
                    price={product.price}
                    mrp={product.oldPrice}
                    discount={product.discount ? `${product.discount}% OFF` : null}
                    rating="4.2"
                    reviews="150"
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-16">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded border text-sm font-semibold transition ${currentPage === number
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                        }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;  