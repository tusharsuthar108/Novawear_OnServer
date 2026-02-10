import React, { useState, useEffect } from "react";
import { Upload, ChevronRight, Tag, Layers, Plus, X, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ================= HELPERS ================= */
const getCode = (str, len = 3) => {
    if (!str) return "XXX";
    return str.substring(0, len).toUpperCase();
};

const generateFullSKU = (data, brands, sizesList, colorList) => {
    // 1. Brand
    const brandObj = brands.find(b => b.brand_id == data.brand);
    const brandCode = brandObj ? getCode(brandObj.brand_slug || brandObj.brand_name) : 'XXX';

    // 2. Category + SubCategory
    const masterCode = data.master ? getCode(data.master.slug || data.master.name, 1) : 'X';
    const catCode = data.category ? getCode(data.category.slug || data.category.name, 1) : 'X';
    const subCatCode = data.subCategory ? getCode(data.subCategory.slug || data.subCategory.name, 1) : 'X';
    const catSegment = `${masterCode}${catCode}${subCatCode}`;

    // 3. Style/Type
    const styleCode = data.type ? getCode(data.type.slug || data.type.type_name, 4) : 'XXXX';

    // 4. Variant specific (Color & Size)
    const firstVariant = data.variants[0];
    const colorObj = colorList.find(c => c.color_id == firstVariant?.attributes?.Color);
    const colorCode = colorObj ? getCode(colorObj.color_name, 3) : 'XXX';

    const sizeObj = sizesList.find(s => s.size_id == firstVariant?.attributes?.Size);
    const sizeCode = sizeObj ? sizeObj.size_name : "XX";

    return `${brandCode}-${catSegment}-${styleCode}-${colorCode}-${sizeCode}`.toUpperCase();
};

/* ================= MAIN COMPONENT ================= */
const AddProduct = () => {
    const navigate = useNavigate();

    // Data State
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [fabrics, setFabrics] = useState([]);
    const [patterns, setPatterns] = useState([]);
    const [masterCategories, setMasterCategories] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        brand: "", // brand_id
        sku: "SKU-PENDING",
        description: "",
        long_description: "",
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

    // Fetch Initial Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [brandRes, colorRes, sizeRes, masterRes, fabricRes, patternRes] = await Promise.all([
                    fetch('http://localhost:3000/api/brands'),
                    fetch('http://localhost:3000/api/colors'),
                    fetch('http://localhost:3000/api/sizes'),
                    fetch('http://localhost:3000/api/master-categories'),
                    fetch('http://localhost:3000/api/fabrics'),
                    fetch('http://localhost:3000/api/patterns')
                ]);

                const brandData = await brandRes.json();
                const colorData = await colorRes.json();
                const sizeData = await sizeRes.json();
                const masterData = await masterRes.json();
                const fabricData = await fabricRes.json();
                const patternData = await patternRes.json();

                console.log('Brand API Response:', brandData);
                console.log('Brands data:', brandData.data);
                console.log('Brands count:', brandData.data?.length);

                if (brandData.success) setBrands(brandData.data);
                if (colorData.success) setColors(colorData.data);
                if (sizeData.success) setSizes(sizeData.data);
                if (masterData.success) setMasterCategories(masterData.data);
                if (fabricData.success) setFabrics(fabricData.data);
                if (patternData.success) setPatterns(patternData.data);

            } catch (error) {
                console.error("Failed to load initial data", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Categories when Master changes (if not nested)
    const [allCategories, setAllCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);
    const [allProductTypes, setAllProductTypes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/categories').then(r => r.json()).then(d => {
            console.log('Categories loaded:', d.data?.length || 0);
            setAllCategories(d.data || []);
        });
        fetch('http://localhost:3000/api/subcategories').then(r => r.json()).then(d => {
            console.log('Subcategories loaded:', d.data?.length || 0);
            setAllSubCategories(d.data || []);
        });
        fetch('http://localhost:3000/api/product-types').then(r => r.json()).then(d => {
            console.log('Product types loaded:', d.data?.length || 0);
            console.log('Product types data:', d.data);
            setAllProductTypes(d.data || []);
        });
    }, []);

    // Derived state for dropdowns
    const availableCategories = allCategories.filter(c => c.master_category_id === formData.master?.master_category_id);
    const availableSubCategories = allSubCategories.filter(sc => sc.category_id === formData.category?.category_id);
    const availableTypes = allProductTypes.filter(pt => pt.sub_category_id === formData.subCategory?.sub_category_id);
    
    console.log('Available types for subcategory', formData.subCategory?.sub_category_id, ':', availableTypes);


    // Effect to handle SKU generation
    useEffect(() => {
        const isReady = formData.brand && formData.master && formData.variants[0].attributes.Color && formData.variants[0].attributes.Size;
        if (isReady) {
            setFormData((prev) => ({
                ...prev,
                sku: generateFullSKU(prev, brands, sizes, colors),
            }));
        }
    }, [formData.brand, formData.master, formData.category, formData.subCategory, formData.type, formData.variants, brands, colors, sizes]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        if (!formData.brand) return alert("Please select All Required Fields");

        const data = new FormData();

        // 1. Append basic info
        data.append("title", formData.title);
        data.append("brand", formData.brand); // brand_id
        data.append("sku", formData.sku);
        data.append("description", formData.description);
        data.append("long_description", formData.long_description);

        // 2. Append Category IDs
        data.append("master", formData.master?.master_category_id);
        data.append("category", formData.category?.category_id);
        data.append("subCategory", formData.subCategory?.sub_category_id);
        data.append("type", formData.type?.type_id); // product_type_mapping

        // 3. Append Variants
        const variantsMetadata = formData.variants.map((v, index) => {
            if (v.image) {
                data.append(`variantImage`, v.image);
            }
            return {
                attributes: v.attributes, // Contains Color (ID) and Size (ID)
                salePrice: v.salePrice,   // Will fill 'discount_price' or 'price'
                mrp: v.mrp,               // Will fill 'price'
                stock: v.stock,
                hasImage: !!v.image
            };
        });

        data.append("variants", JSON.stringify(variantsMetadata));

        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                body: data,
            });

            const resData = await response.json();

            if (response.ok) {
                alert("Product added successfully!");
            } else {
                alert("Error: " + resData.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission Failed: server error");
        }
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
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
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
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />

                            <div className="w-full">
                                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Brand ({brands.length} available)</label>
                                <select
                                    value={formData.brand}
                                    onChange={(e) => {
                                        console.log('Brand selected:', e.target.value);
                                        setFormData({ ...formData, brand: e.target.value });
                                    }}
                                    className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all text-slate-700 text-sm font-medium"
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map(b => <option key={b.brand_id} value={b.brand_id}>{b.brand_name}</option>)}
                                </select>
                            </div>

                            <div className="relative">
                                <input
                                    readOnly
                                    value={formData.sku}
                                    className="w-full rounded-xl border-2 border-dashed border-indigo-100 bg-indigo-50/30 px-4 py-3 text-indigo-600 font-mono text-sm focus:outline-none"
                                />
                                <div className="absolute -top-2 left-3 px-1 bg-white text-[9px] font-bold text-indigo-400 uppercase">Auto-Generated SKU</div>
                            </div>
                        </div>
                        <div className="mt-4 space-y-4">
                            <FloatingInput
                                label="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="w-full">
                                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Long Description</label>
                                <textarea
                                    value={formData.long_description}
                                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                                    className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all text-sm"
                                    rows="4"
                                    placeholder="Enter detailed product description..."
                                />
                            </div>
                        </div>
                    </Section>

                    {/* SECTION 2: ARCHITECTURE */}
                    <Section title="Categorization" icon={<Layers size={18} />}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <ModernSelect
                                label="Master"
                                options={masterCategories}
                                value={formData.master}
                                valueKey="master_category_id"
                                labelKey="name"
                                onChange={(v) => setFormData({ ...formData, master: v, category: null, subCategory: null, type: null })}
                            />
                            <ModernSelect
                                label="Category"
                                disabled={!formData.master}
                                options={availableCategories}
                                value={formData.category}
                                valueKey="category_id"
                                labelKey="name"
                                onChange={(v) => setFormData({ ...formData, category: v, subCategory: null, type: null })}
                            />
                            <ModernSelect
                                label="Sub Category"
                                disabled={!formData.category}
                                options={availableSubCategories}
                                value={formData.subCategory}
                                valueKey="sub_category_id"
                                labelKey="name"
                                onChange={(v) => setFormData({ ...formData, subCategory: v, type: null })}
                            />
                            <ModernSelect
                                label="Style / Fit"
                                disabled={!formData.subCategory}
                                options={availableTypes}
                                value={formData.type}
                                valueKey="type_id"
                                labelKey="type_name"
                                onChange={(v) => setFormData({ ...formData, type: v })}
                            />
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
                                                    {/* SKU Preview for this variant */}
                                                    SKU: {generateFullSKU({ ...formData, variants: [variant] }, brands, sizes, colors)}
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
                                        {/* Color - Dynamic from DB */}
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Color</label>
                                            <select
                                                value={variant.attributes.Color}
                                                onChange={(e) => updateVariantAttribute(variant.id, "Color", e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Select Color</option>
                                                {colors.map((c) => <option key={c.color_id} value={c.color_id}>{c.color_name}</option>)}
                                            </select>
                                        </div>

                                        {/* Size - Dynamic from DB */}
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Size</label>
                                            <select
                                                value={variant.attributes.Size}
                                                onChange={(e) => updateVariantAttribute(variant.id, "Size", e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Select Size</option>
                                                {sizes.map((s) => <option key={s.size_id} value={s.size_id}>{s.size_name}</option>)}
                                            </select>
                                        </div>

                                        {/* Fabric - Dynamic from DB */}
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Fabric</label>
                                            <select
                                                value={variant.attributes.Fabric}
                                                onChange={(e) => updateVariantAttribute(variant.id, "Fabric", e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Select Fabric</option>
                                                {fabrics.map((f) => <option key={f.fabric_id} value={f.fabric_id}>{f.fabric_name}</option>)}
                                            </select>
                                        </div>

                                        {/* Pattern - Dynamic from DB */}
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Pattern</label>
                                            <select
                                                value={variant.attributes.Pattern}
                                                onChange={(e) => updateVariantAttribute(variant.id, "Pattern", e.target.value)}
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm"
                                            >
                                                <option value="">Select Pattern</option>
                                                {patterns.map((p) => <option key={p.pattern_id} value={p.pattern_id}>{p.pattern_name}</option>)}
                                            </select>
                                        </div>

                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Price & Stock</label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                                                    <input type="number" placeholder="MRP" value={variant.mrp} onChange={(e) => updateVariant(variant.id, "mrp", e.target.value)} className="w-42 pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
                                                </div>
                                                <div className="relative flex-1">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                                                    <input type="number" placeholder="Sale Price" value={variant.salePrice} onChange={(e) => updateVariant(variant.id, "salePrice", e.target.value)} className="w-42 pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none" />
                                                </div>
                                                <input type="number" placeholder="Qty" value={variant.stock} onChange={(e) => updateVariant(variant.id, "stock", e.target.value)} className="w-42 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                                            </div>
                                        </div>

                                        <div className="md:col-span-3">
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

const ModernSelect = ({ label, options = [], value, onChange, disabled, valueKey = "id", labelKey = "name" }) => (
    <div className="w-full">
        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">{label}</label>
        <select
            disabled={disabled}
            value={value ? value[valueKey] : ""}
            onChange={(e) => onChange(options.find((o) => o[valueKey] === Number(e.target.value)))}
            className={`w-full rounded-xl px-4 py-3 border-2 text-sm transition-all outline-none ${disabled
                ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                : "bg-slate-50/50 border-slate-100 text-slate-700 hover:border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                }`}
        >
            <option value="">Choose {label}</option>
            {options.map((o) => (
                <option key={o[valueKey]} value={o[valueKey]}>{o[labelKey]}</option>
            ))}
        </select>
    </div>
);

export default AddProduct;
