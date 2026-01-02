import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/database";
import { useCart } from "../context/CartContext";
import { Search, ShoppingBag, User, ChevronDown } from "lucide-react";
import Logo from "../assets/logo.png"; // or .svg, .jpg, etc.

export default function Navbar() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();

  const newArrivals = categories.find((c) => c.slug === "new-arrivals");
  const bestSellers = categories.find((c) => c.slug === "best-sellers");
  const menCategory = categories.find((c) => c.slug === "men");

  // MANUALLY ADDED COMPANY & HELP DROPDOWN DATA
  const companyDropdown = {
    id: "company-drop",
    name: "Company",
    subCategories: [
      {
        id: "c1",
        name: "About Us",
        subCategories: [
          {
            id: "c1-1",
            name: "Our Story",
            types: [
              { id: "t1", name: "The Brand" },
              { id: "t2", name: "Sustainability" },
              { id: "t3", name: "Careers" },
            ],
          },
        ],
      },
      {
        id: "c2",
        name: "Newsroom",
        subCategories: [
          {
            id: "c2-1",
            name: "Latest",
            types: [
              { id: "t4", name: "Press Releases" },
              { id: "t5", name: "Lookbook" },
            ],
          },
        ],
      },
    ],
  };

  const helpDropdown = {
    id: "help-drop",
    name: "Help & Support",
    subCategories: [
      {
        id: "h1",
        name: "Customer Service",
        subCategories: [
          {
            id: "h1-1",
            name: "Orders",
            types: [
              { id: "t6", name: "Track Order" },
              { id: "t6b", name: "My Orders" },
              { id: "t7", name: "Returns & Exchanges" },
              { id: "t8", name: "Shipping Info" },
            ],
          },
        ],
      },
      {
        id: "h2",
        name: "Contact",
        subCategories: [
          {
            id: "h2-1",
            name: "Reach Out",
            types: [
              { id: "t9", name: "Contact Us" },
              { id: "t10", name: "FAQs" },
              { id: "t11", name: "Size Guide" },
            ],
          },
        ],
      },
    ],
  };

  const staticPages = [
    { id: "sale", name: "Sale", href: "/sale", highlight: true },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMegaMenu = (cat) => (
    <div
      className={`absolute left-0 top-full w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-500 ${
        activeCategory === cat.id
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-12 py-12 grid grid-cols-5 gap-8">
        {cat.subCategories.map((sub) => (
          <div key={sub.id} className="space-y-4">
            <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
              {sub.name}
            </h3>

            {sub.subCategories.map((child) => (
              <div key={child.id}>
                <p
                  onClick={() =>
                    navigate(
                      `/products?mainCategory=${child.name.toLowerCase()}`
                    )
                  }
                  className="text-sm font-bold text-gray-900 mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  {child.name}
                </p>
                <ul className="space-y-2">
                  {child.types?.map((type) => (
                    <li
                      key={type.id}
                      onClick={() => {
                        if (type.name === "Track Order") {
                          navigate("/track-order");
                        } else if (type.name === "My Orders") {
                          navigate("/orders");
                        } else {
                          navigate(
                            `/products?subCategory=${type.name.toLowerCase()}`
                          );
                        }
                      }}
                      className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors"
                    >
                      {type.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {/* PROMO BOX */}
        <div className="rounded-2xl bg-indigo-50 p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Nova Exclusive
            </p>
            <h4 className="text-xl font-bold mt-2">{cat.name} Information</h4>
          </div>
          <button className="mt-4 py-3 bg-black text-white text-xs font-bold rounded-lg relative z-10">
            LEARN MORE
          </button>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-200 rounded-full blur-2xl opacity-50" />
        </div>
      </div>
    </div>
  );

  return (
    <header
      onMouseLeave={() => setActiveCategory(null)}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img
            src={Logo}
            alt="Nova Logo"
            // Adjusted height: h-12 is larger than before
            className={`transition-all duration-300 ${
              scrolled ? "h-10" : "h-14"
            } w-auto object-contain`}
          />
        </div>

        {/* NAVBAR */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* COMBINED DROPDOWNS (Database + Manual Company/Help) */}
          {[
            newArrivals,
            bestSellers,
            menCategory,
            companyDropdown,
            helpDropdown,
          ].map(
            (cat) =>
              cat && (
                <div
                  key={cat.id}
                  className="static group"
                  onMouseEnter={() => setActiveCategory(cat.id)}
                >
                  <button className="text-[13px] font-bold uppercase tracking-widest text-gray-700 hover:text-indigo-600 flex items-center gap-1 py-4">
                    {cat.name}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        activeCategory === cat.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {renderMegaMenu(cat)}
                </div>
              )
          )}

          {/* STATIC PAGES (SALE ONLY) */}
          {staticPages.map((page) => (
            <a
              key={page.id}
              href={page.href}
              className={`text-[12px] font-bold uppercase tracking-widest py-4 ${
                page.highlight
                  ? "text-red-600 hover:text-red-700"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              {page.name}
            </a>
          ))}
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5">
          <div className="relative hidden xl:block">
            <input
              placeholder="Search..."
              className="bg-gray-100 py-2 pl-10 pr-4 rounded-full text-sm w-64 focus:w-80 transition-all outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <div
            className="relative cursor-pointer hover:text-indigo-600"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </div>
          <User className="w-5 h-5 cursor-pointer hover:text-indigo-600" />
        </div>
      </div>
    </header>
  );
}
