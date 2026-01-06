import React, { useState, useEffect } from "react";
import { Upload, ChevronRight, Tag, Layers, Plus, X, RefreshCw } from "lucide-react";

/* ================= HELPERS ================= */
const getCode = (str, len = 3) => {
  if (!str) return "XXX";
  
  // Professional mapping for industry-standard abbreviations
  const mapping = {
    // Brands
    "Nike": "NKE", "Adidas": "ADI", "Zara": "ZRA", "H&M": "HNM", "Levi's": "LEV", "Gucci": "GCI", "Puma": "PMA",
    // Master Categories
    "Men": "M", "Women": "W", "Kids": "K",
    // Sub-Categories
    "Top Wear": "TW", "Bottom Wear": "BW",
    // Styles/Sub-Categories
    "Shirts": "SHT", "Polo Shirts": "POLO", "Casual Shirts": "CSL", "Formal Shirts": "FRML",
    // Fits/Types
    "Slim Fit": "SLIM", "Regular Fit": "REGL", "Oversized": "OVRZ",
    // Colors
    "Black": "BLK", "White": "WHT", "Blue": "BLU", "Red": "RED", "Green": "GRN",
    // Sizes
    "S": "S", "M": "M", "L": "L", "XL": "XL", "XXL": "XXL"
  };

  return mapping[str] || str.substring(0, len).toUpperCase();
};

const generateFullSKU = (data) => {
  // 1. Brand (e.g., STC)
  const brand = getCode(data.brand);
  
  // 2. Category + SubCategory combined (e.g., MTS for Men's Top Shirt)
  const master = getCode(data.master?.name, 1);
  const cat = getCode(data.category?.name, 1);
  const subCat = getCode(data.subCategory?.name, 1);
  const catSegment = `${master}${cat}${subCat}`; // e.g., MTS

  // 3. Style/Type (e.g., SLIM)
  const style = getCode(data.type?.name, 4);

  // 4. Variant specific (Color & Size)
  const firstVariant = data.variants[0];
  const color = getCode(firstVariant?.attributes?.Color, 3);
  const size = firstVariant?.attributes?.Size || "XX";

  // Final Format: STC-MTS-SLIM-BLK-M
  return `${brand}-${catSegment}-${style}-${color}-${size}`.toUpperCase();
};

/* ================= DATA SETS ================= */
const brandOptions = ["Nike", "Adidas", "Zara", "H&M", "Levi's", "Gucci", "Puma"];

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
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    sku: "SKU-PENDING",
    description: "",
    master: null,
    category: null,
    subCategory: null,
    type: null,
    variants: [
      {
        id: Date.now(),
        attributes: { Color: "", Size: "", Pattern: "", Fabric: "" },
        salePrice: "",
        mrp: "",
        stock: "",
        image: null,
      },
    ],
  });

  // Effect to handle SKU generation based on your specific format
  useEffect(() => {
    const isReady = formData.brand && formData.master && formData.variants[0].attributes.Color;
    if (isReady) {
      setFormData((prev) => ({
        ...prev,
        sku: generateFullSKU(prev),
      }));
    }
  }, [formData.brand, formData.master, formData.category, formData.subCategory, formData.type, formData.variants]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Product Object:", formData);
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, {
        id: Date.now(),
        attributes: { Color: "", Size: "", Pattern: "", Fabric: "" },
        salePrice: "", mrp: "", stock: "", image: null,
      }],
    }));
  };

  const removeVariant = (id) => {
    setFormData((prev) => ({ ...prev, variants: prev.variants.filter((v) => v.id !== id) }));
  };

  const updateVariant = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) => v.id === id ? { ...v, [field]: value } : v),
    }));
  };

  const updateVariantAttribute = (id, key, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id ? { ...v, attributes: { ...v.attributes, [key]: value } } : v
      ),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#f8fafc] pb-24 font-sans">
      {/* HEADER */}
      <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Add New Listing</h1>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master SKU</span>
               <span className="text-sm font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded-full border border-indigo-100">
                {formData.sku}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="px-8 py-3 rounded-xl font-bold bg-slate-900 text-white shadow-xl hover:bg-black transition-all active:scale-95 flex items-center gap-2">
              <Plus size={18} /> Save Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10">
        <div className="space-y-8">
          
          {/* SECTION 1: IDENTITY */}
          <Section title="Product Identity" icon={<Tag size={18} />}>
            <div className="grid md:grid-cols-3 gap-6">
              <FloatingInput 
                label="Product Title (e.g. Slim Fit Polo)" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
              />
              
              <select
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-700 text-sm font-medium"
              >
                <option value="">Select Brand</option>
                {brandOptions.map(b => <option key={b} value={b}>{b}</option>)}
              </select>

              <div className="relative">
                <input 
                  readOnly
                  value={formData.sku}
                  className="w-full rounded-xl border-2 border-dashed border-indigo-100 bg-indigo-50/30 px-4 py-3 text-indigo-600 font-mono text-sm focus:outline-none"
                />
                <div className="absolute -top-2 left-3 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase">Auto-Generated SKU</div>
              </div>
            </div>
          </Section>

          {/* SECTION 2: ARCHITECTURE */}
          <Section title="Categorization" icon={<Layers size={18} />}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ModernSelect label="Master" options={categoryData} value={formData.master} onChange={(v) => setFormData({...formData, master: v, category: null, subCategory: null, type: null})} />
              <ModernSelect label="Category" disabled={!formData.master} options={formData.master?.categories} value={formData.category} onChange={(v) => setFormData({...formData, category: v, subCategory: null, type: null})} />
              <ModernSelect label="Sub Category" disabled={!formData.category} options={formData.category?.subCategories} value={formData.subCategory} onChange={(v) => setFormData({...formData, subCategory: v, type: null})} />
              <ModernSelect label="Style / Fit" disabled={!formData.subCategory} options={formData.subCategory?.types} value={formData.type} onChange={(v) => setFormData({...formData, type: v})} />
            </div>
          </Section>

          {/* SECTION 3: VARIANTS */}
          <Section title="Inventory Variants" icon={<ChevronRight size={18} />}>
            <div className="space-y-6">
              {formData.variants.map((variant, index) => (
                <div key={variant.id} className="relative group bg-white rounded-2xl border-2 border-slate-100 p-6 transition-all hover:border-indigo-100">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800">Variant Configuration</p>
                        <p className="text-[11px] font-mono text-indigo-500 font-bold">
                          SKU: {formData.brand ? getCode(formData.brand) : '???'}-{formData.master ? getCode(formData.master.name, 1) + getCode(formData.category?.name, 1) + getCode(formData.subCategory?.name, 1) : '???'}-{formData.type ? getCode(formData.type.name, 4) : '???'}-{getCode(variant.attributes.Color)}-{variant.attributes.Size || '??'}
                        </p>
                      </div>
                    </div>
                    {formData.variants.length > 1 && (
                      <button type="button" onClick={() => removeVariant(variant.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                        <X size={18} />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(variantOptions).map(([key, values]) => (
                      <div key={key}>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">{key}</label>
                        <select
                          value={variant.attributes[key]}
                          onChange={(e) => updateVariantAttribute(variant.id, key, e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm"
                        >
                          <option value="">Select {key}</option>
                          {values.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Price & Stock</label>
                      <div className="flex gap-2">
                         <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                            <input type="number" placeholder="Price" value={variant.salePrice} onChange={(e) => updateVariant(variant.id, "salePrice", e.target.value)} className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
                         </div>
                         <input type="number" placeholder="Qty" value={variant.stock} onChange={(e) => updateVariant(variant.id, "stock", e.target.value)} className="w-24 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Variant Image</label>
                      <label className="border-2 border-dashed border-slate-100 rounded-xl p-2 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all">
                        <input type="file" hidden onChange={(e) => updateVariant(variant.id, "image", e.target.files[0])} />
                        {variant.image ? (
                          <>
                            <img src={URL.createObjectURL(variant.image)} className="w-10 h-10 object-cover rounded-lg" alt="v" />
                            <span className="text-xs text-slate-500 truncate">{variant.image.name}</span>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 px-2 py-1">
                            <Upload className="text-slate-400" size={16} />
                            <span className="text-xs text-slate-400 font-medium">Upload Image</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addVariant}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 group"
              >
                <Plus size={20} className="group-hover:scale-125 transition-transform" /> Add Color/Size Variation
              </button>
            </div>
          </Section>
        </div>
      </div>
    </form>
  );
};

/* ================= UI HELPERS ================= */

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="flex items-center gap-3 px-8 py-5 border-b border-slate-50">
      <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">{icon}</div>
      <h2 className="text-sm font-black text-slate-700 uppercase tracking-widest">{title}</h2>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const FloatingInput = ({ label, type = "text", value, onChange }) => (
  <div className="w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all text-sm"
    />
  </div>
);

const ModernSelect = ({ label, options = [], value, onChange, disabled }) => (
  <div className="w-full">
    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">{label}</label>
    <select
      disabled={disabled}
      value={value?.id || ""}
      onChange={(e) => onChange(options.find((o) => o.id === Number(e.target.value)))}
      className={`w-full rounded-xl px-4 py-3 border-2 text-sm transition-all outline-none ${
        disabled
          ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
          : "bg-slate-50/50 border-slate-100 text-slate-700 hover:border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
      }`}
    >
      <option value="">Choose {label}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>{o.name}</option>
      ))}
    </select>
  </div>
);

export default AddProduct;