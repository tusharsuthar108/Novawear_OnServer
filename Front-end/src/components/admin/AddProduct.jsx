import React, { useState } from "react";
import { Upload, ChevronRight, Check, Package, Tag, Layers, CreditCard } from "lucide-react";

/* ================= CATEGORY DATA ================= */
const categoryData = [
  {
    id: 1,
    name: "Men",
    categories: [
      {
        id: 11,
        name: "Top Wear",
        subCategories: [
          {
            id: 111,
            name: "Shirts",
            types: [
              { id: 1111, name: "Polo Shirts" },
              { id: 1112, name: "Casual Shirts" },
              { id: 1113, name: "Formal Shirts" },
            ],
          },
        ],
      },
    ],
  },
];

const variantOptions = {
  Color: ["Black", "White", "Blue", "Red", "Green"],
  Size: ["S", "M", "L", "XL", "XXL"],
  Pattern: ["Solid", "Printed", "Striped", "Checked"],
  Fabric: ["Cotton", "Linen", "Denim", "Polyester"],
};

/* ================= MAIN COMPONENT ================= */
const AddProduct = () => {
  const [master, setMaster] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [type, setType] = useState(null);
  const [image, setImage] = useState(null);
  const [variants, setVariants] = useState({});

  const toggleVariant = (key, value) => {
    setVariants((prev) => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans antialiased pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: 8 Units */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* SECTION: BASIC INFO */}
            <Section icon={<Tag size={18}/>} title="General Information">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FloatingInput label="Product Title" placeholder="e.g. Premium Linen Shirt" />
                  <FloatingInput label="SKU ID" placeholder="SH-2024-BLK" />
                </div>
                <div className="relative">
                  <textarea 
                    className="w-full pt-6 pb-3 px-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition min-h-[120px]"
                    placeholder=" "
                  />
                  <label className="absolute left-4 top-2 text-[10px] uppercase tracking-wider font-bold text-slate-400">Description</label>
                </div>
              </div>
            </Section>

            {/* SECTION: CATEGORIES */}
            <Section icon={<Layers size={18}/>} title="Category Architecture">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ModernSelect 
                  label="Master" 
                  options={categoryData} 
                  value={master}
                  onChange={(v) => { setMaster(v); setCategory(null); setSubCategory(null); setType(null); }} 
                />
                <ModernSelect 
                  label="Category" 
                  disabled={!master}
                  options={master?.categories} 
                  value={category}
                  onChange={(v) => { setCategory(v); setSubCategory(null); setType(null); }} 
                />
                <ModernSelect 
                  label="Sub Category" 
                  disabled={!category}
                  options={category?.subCategories} 
                  value={subCategory}
                  onChange={(v) => { setSubCategory(v); setType(null); }} 
                />
                <ModernSelect 
                  label="Type" 
                  disabled={!subCategory}
                  options={subCategory?.types} 
                  value={type}
                  onChange={setType} 
                />
              </div>
            </Section>

            {/* SECTION: VARIANTS */}
            <Section icon={<ChevronRight size={18}/>} title="Product Variants">
              <div className="space-y-8">
                {Object.entries(variantOptions).map(([key, values]) => (
                  <div key={key}>
                    <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-3 block">{key}</label>
                    <div className="flex flex-wrap gap-2">
                      {values.map((value) => {
                        const isSelected = variants[key]?.includes(value);
                        return (
                          <button
                            key={value}
                            onClick={() => toggleVariant(key, value)}
                            className={`group flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                              isSelected 
                              ? "bg-black border-black text-white" 
                              : "bg-white border-slate-100 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <span className="text-sm font-medium">{value}</span>
                            {isSelected && <Check size={14} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* RIGHT COLUMN: 4 Units */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* IMAGE UPLOAD */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Media Assets</h3>
              <label className="group relative flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-8 cursor-pointer hover:bg-slate-50 hover:border-slate-400 transition-all">
                <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
                
                {image ? (
                  <div className="relative w-full h-64">
                    <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover rounded-2xl shadow-lg" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-2xl">
                      <p className="text-white text-sm font-medium">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                      <Upload className="text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Drop your image here</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>

            {/* PRICING CARD */}
            <Section icon={<CreditCard size={18}/>} title="Pricing & Stock">
              <div className="space-y-4">
                <FloatingInput label="Sale Price" type="number" placeholder="0.00" />
                <FloatingInput label="Compare at Price (MRP)" type="number" placeholder="0.00" />
                <div className="pt-2">
                  <FloatingInput label="Stock Count" type="number" placeholder="0" />
                </div>
              </div>
            </Section>

            {/* SUMMARY WIDGET */}
            <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-200">
               <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Product Summary</p>
               <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Status</span>
                    <span className="text-green-400 flex items-center gap-1 font-medium"><div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Ready to publish</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Variations</span>
                    <span className="font-medium">{Object.values(variants).flat().length} Selected</span>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE ATOMS ================= */

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
    <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3">
      <div className="text-slate-400">{icon}</div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const FloatingInput = ({ label, type = "text", placeholder }) => (
  <div className="relative group w-full">
    <input
      type={type}
      placeholder={placeholder}
      className="peer w-full pt-6 pb-2 px-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition"
    />
    <label className="absolute left-4 top-2 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 transition-all peer-placeholder-shown:text-transparent">
      {label}
    </label>
  </div>
);

const ModernSelect = ({ label, options = [], onChange, value, disabled }) => (
  <div className={`flex flex-col gap-2 ${disabled ? 'opacity-40' : ''}`}>
    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">{label}</label>
    <select
      disabled={disabled}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none appearance-none cursor-pointer"
      onChange={(e) => onChange(options.find((o) => o.id === Number(e.target.value)))}
      value={value?.id || ""}
    >
      <option value="">Choose...</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>{o.name}</option>
      ))}
    </select>
  </div>
);

export default AddProduct;