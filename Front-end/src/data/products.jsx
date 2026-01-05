export const products = [
  {
    id: 1101,
    slug: "v-neck-cotton-tshirt-1101",
    title: "V-Neck Cotton T-Shirt",
    brand: "Vibe",

    price: 999,
    oldPrice: 1699,
    discount: 41,

    createdAt: "2025-02-01",

    description: "Premium cotton V-neck t-shirt designed for everyday comfort.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "V-Neck",
    },

    seller: "Vibe Clothing",
    country: "India",

    /* ✅ 5 IMAGES */
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", // main
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", // side
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f", // back
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a", // detail
      "https://images.unsplash.com/photo-1602810319428-019690571b5b", // lifestyle
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
    ],

    specifications: {
      fabric: "100% Cotton",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      neck: "V-Neck",
      occasion: "Casual Wear",
    },

    reviewsData: [],
  },

  {
    id: 1102,
    slug: "polo-cotton-tshirt-1102",
    title: "Classic Polo Cotton T-Shirt",
    brand: "U.S. Polo Assn.",

    price: 1899,
    oldPrice: 2999,
    discount: 59,

    createdAt: "2025-10-02",

    description:
      "Premium polo t-shirt with breathable cotton and classic collar.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Polo T-Shirt",
    },

    seller: "U.S. Polo India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [
      { name: "Navy Blue", hex: "#020617" },
      { name: "White", hex: "#ffffff" },
    ],

    specifications: {
      fabric: "Pique Cotton",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      neck: "Polo Collar",
      occasion: "Casual / Semi-Formal",
    },

    reviewsData: [],
  },

  {
    id: 1103,
    slug: "basic-black-tee-1103",
    title: "Basic Black Tee",
    brand: "H&M",

    price: 799,
    oldPrice: 1299,
    discount: 38,

    createdAt: "2025-02-03",

    description: "Minimal everyday basic t-shirt with soft cotton fabric.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Basic Tees",
    },

    seller: "H&M India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Cotton",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      neck: "Round Neck",
      occasion: "Daily Wear",
    },

    reviewsData: [],
  },

  {
    id: 1104,
    slug: "crew-neck-premium-tee-1104",
    title: "Premium Crew Neck T-Shirt",
    brand: "Uniqlo",

    price: 1299,
    oldPrice: 2199,
    discount: 65,

    createdAt: "2025-12-04",

    description: "Soft premium crew neck t-shirt for all-day comfort.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Crew Neck",
    },

    seller: "Uniqlo India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [
      { name: "Grey", hex: "#9ca3af" },
      { name: "White", hex: "#ffffff" },
    ],

    specifications: {
      fabric: "Supima Cotton",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      neck: "Crew Neck",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1105,
    slug: "graphic-street-tee-1105",
    title: "Graphic Street T-Shirt",
    brand: "Bewakoof",

    price: 999,
    oldPrice: 1699,
    discount: 41,

    createdAt: "2025-02-05",

    description: "Bold graphic printed t-shirt inspired by street culture.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Graphic Tees",
    },

    seller: "Bewakoof Brands",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1516826957135-700dedea698c",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Charcoal", hex: "#1f2937" }],

    specifications: {
      fabric: "Cotton Blend",
      fit: "Oversized",
      sleeve: "Half Sleeve",
      neck: "Round Neck",
      occasion: "Street / Casual",
    },

    reviewsData: [],
  },

  {
    id: 1106,
    slug: "sports-performance-tee-1106",
    title: "Sports Performance T-Shirt",
    brand: "Nike",

    price: 1499,
    oldPrice: 2499,
    discount: 40,

    createdAt: "2025-02-06",

    description: "Moisture-wicking t-shirt for gym and training.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Basic Tees",
    },

    seller: "Nike India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Red", hex: "#dc2626" }],

    specifications: {
      fabric: "Polyester",
      fit: "Athletic Fit",
      sleeve: "Half Sleeve",
      neck: "Round Neck",
      occasion: "Sports / Gym",
    },

    reviewsData: [],
  },

  {
    id: 1107,
    slug: "striped-crew-neck-tee-1107",
    title: "Striped Crew Neck T-Shirt",
    brand: "ZARA",

    price: 1399,
    oldPrice: 2299,
    discount: 39,

    createdAt: "2025-02-07",

    description: "Modern striped crew neck t-shirt with premium feel.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Crew Neck",
    },

    seller: "ZARA India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Black & White", hex: "#111827" }],

    specifications: {
      fabric: "Cotton Blend",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      neck: "Crew Neck",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1108,
    slug: "oversized-basic-tee-1108",
    title: "Oversized Basic T-Shirt",
    brand: "Snitch",

    price: 1199,
    oldPrice: 1999,
    discount: 40,

    createdAt: "2025-02-08",

    description: "Relaxed oversized t-shirt for modern street styling.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Basic Tees",
    },

    seller: "Snitch Clothing",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Beige", hex: "#f5f5dc" }],

    specifications: {
      fabric: "Cotton",
      fit: "Oversized",
      sleeve: "Half Sleeve",
      neck: "Round Neck",
      occasion: "Street Wear",
    },

    reviewsData: [],
  },

  {
    id: 1109,
    slug: "printed-graphic-tee-1109",
    title: "Printed Graphic T-Shirt",
    brand: "HRX",

    price: 899,
    oldPrice: 1499,
    discount: 40,

    createdAt: "2025-02-09",

    description: "Lightweight printed t-shirt with sporty vibe.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Graphic Tees",
    },

    seller: "HRX India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Yellow", hex: "#fde047" }],

    specifications: {
      fabric: "Cotton",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      neck: "Round Neck",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1110,
    slug: "premium-crew-tee-1110",
    title: "Premium Crew Neck T-Shirt",
    brand: "Levi's",

    price: 1799,
    oldPrice: 2999,
    discount: 40,

    createdAt: "2025-02-10",

    description: "High-quality premium crew neck t-shirt from Levi’s.",

    category: {
      gender: "Men",
      type: "T-Shirts",
      subtype: "Crew Neck",
    },

    seller: "Levi's India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1516826957135-700dedea698c",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Dark Green", hex: "#064e3b" }],

    specifications: {
      fabric: "Premium Cotton",
      fit: "Slim Fit",
      sleeve: "Half Sleeve",
      neck: "Crew Neck",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1201,
    slug: "white-formal-dress-shirt-1201",
    title: "Classic White Dress Shirt",
    brand: "Arrow",

    price: 1999,
    oldPrice: 3299,
    discount: 39,

    createdAt: "2025-02-11",

    description:
      "Sharp formal dress shirt crafted for office and business wear.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Dress Shirt",
    },

    seller: "Arrow India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],

    colors: [{ name: "White", hex: "#ffffff" }],

    specifications: {
      fabric: "Cotton Blend",
      fit: "Slim Fit",
      sleeve: "Full Sleeve",
      occasion: "Formal / Office",
    },

    reviewsData: [],
  },

  {
    id: 1202,
    slug: "light-blue-dress-shirt-1202",
    title: "Light Blue Formal Shirt",
    brand: "Louis Philippe",

    price: 2299,
    oldPrice: 3799,
    discount: 39,

    createdAt: "2025-02-12",

    description: "Premium formal shirt with a refined professional finish.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Dress Shirt",
    },

    seller: "Louis Philippe India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Sky Blue", hex: "#7dd3fc" }],

    specifications: {
      fabric: "100% Cotton",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Formal",
    },

    reviewsData: [],
  },

  {
    id: 1203,
    slug: "olive-casual-shirt-1203",
    title: "Olive Casual Shirt",
    brand: "Roadster",

    price: 1499,
    oldPrice: 2499,
    discount: 40,

    createdAt: "2025-02-13",

    description: "Relaxed casual shirt perfect for everyday wear.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Casual Shirt",
    },

    seller: "Roadster Lifestyle",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Olive Green", hex: "#556b2f" }],

    specifications: {
      fabric: "Cotton",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1204,
    slug: "checked-casual-shirt-1204",
    title: "Checked Casual Shirt",
    brand: "WROGN",

    price: 1699,
    oldPrice: 2799,
    discount: 39,

    createdAt: "2025-02-14",

    description: "Stylish checked casual shirt with modern fit.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Casual Shirt",
    },

    seller: "WROGN India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Red & Black", hex: "#7f1d1d" }],

    specifications: {
      fabric: "Cotton Blend",
      fit: "Slim Fit",
      sleeve: "Full Sleeve",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1205,
    slug: "navy-flannel-shirt-1205",
    title: "Navy Flannel Shirt",
    brand: "Levi's",

    price: 2199,
    oldPrice: 3499,
    discount: 37,

    createdAt: "2025-02-15",

    description: "Warm flannel shirt ideal for winter casual styling.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Flannel",
    },

    seller: "Levi's India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Navy Blue", hex: "#1e3a8a" }],

    specifications: {
      fabric: "Flannel Cotton",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Winter / Casual",
    },

    reviewsData: [],
  },

  {
    id: 1206,
    slug: "red-black-flannel-shirt-1206",
    title: "Red Check Flannel Shirt",
    brand: "HIGHLANDER",

    price: 1799,
    oldPrice: 2899,
    discount: 38,

    createdAt: "2025-02-16",

    description: "Classic red check flannel shirt with soft brushed fabric.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Flannel",
    },

    seller: "Highlander India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Red Check", hex: "#991b1b" }],

    specifications: {
      fabric: "Flannel Cotton",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Winter / Casual",
    },

    reviewsData: [],
  },

  {
    id: 1207,
    slug: "linen-casual-shirt-1207",
    title: "Breathable Linen Casual Shirt",
    brand: "Marks & Spencer",

    price: 2499,
    oldPrice: 3999,
    discount: 38,

    createdAt: "2025-02-17",

    description: "Lightweight linen casual shirt for summer comfort.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Casual Shirt",
    },

    seller: "Marks & Spencer India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Beige", hex: "#f5f5dc" }],

    specifications: {
      fabric: "Linen",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Summer / Casual",
    },

    reviewsData: [],
  },

  {
    id: 1208,
    slug: "black-formal-shirt-1208",
    title: "Black Formal Shirt",
    brand: "Van Heusen",

    price: 2099,
    oldPrice: 3499,
    discount: 40,

    createdAt: "2025-02-18",

    description: "Elegant black formal shirt for evening office wear.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Dress Shirt",
    },

    seller: "Van Heusen India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Cotton Blend",
      fit: "Slim Fit",
      sleeve: "Full Sleeve",
      occasion: "Formal / Party",
    },

    reviewsData: [],
  },

  {
    id: 1209,
    slug: "denim-casual-shirt-1209",
    title: "Denim Casual Shirt",
    brand: "Pepe Jeans",

    price: 1899,
    oldPrice: 3099,
    discount: 39,

    createdAt: "2025-02-19",

    description: "Rugged denim shirt for casual everyday outfits.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Casual Shirt",
    },

    seller: "Pepe Jeans India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Denim Blue", hex: "#1e40af" }],

    specifications: {
      fabric: "Denim Cotton",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1210,
    slug: "checked-flannel-shirt-1210",
    title: "Checked Winter Flannel Shirt",
    brand: "Jack & Jones",

    price: 2399,
    oldPrice: 3899,
    discount: 38,

    createdAt: "2025-02-20",

    description: "Soft checked flannel shirt designed for cold weather.",

    category: {
      gender: "Men",
      type: "Shirts",
      subtype: "Flannel",
    },

    seller: "Jack & Jones India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Brown Check", hex: "#78350f" }],

    specifications: {
      fabric: "Flannel Cotton",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Winter Wear",
    },

    reviewsData: [],
  },

  {
    id: 1301,
    slug: "navy-blue-formal-suit-1301",
    title: "Navy Blue Formal Suit",
    brand: "Raymond",

    price: 12999,
    oldPrice: 19999,
    discount: 35,

    createdAt: "2025-02-21",

    description:
      "Premium tailored navy blue formal suit designed for business and occasions.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Suit",
    },

    seller: "Raymond India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["38", "40", "42", "44"],

    colors: [{ name: "Navy Blue", hex: "#1e3a8a" }],

    specifications: {
      fabric: "Wool Blend",
      fit: "Tailored Fit",
      occasion: "Business / Formal Events",
    },

    reviewsData: [],
  },

  {
    id: 1302,
    slug: "charcoal-grey-formal-suit-1302",
    title: "Charcoal Grey Formal Suit",
    brand: "Louis Philippe",

    price: 13999,
    oldPrice: 21999,
    discount: 36,

    createdAt: "2025-02-22",

    description: "Elegant charcoal grey suit with refined modern tailoring.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Suit",
    },

    seller: "Louis Philippe India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["38", "40", "42", "44"],

    colors: [{ name: "Charcoal Grey", hex: "#374151" }],

    specifications: {
      fabric: "Poly Wool",
      fit: "Slim Fit",
      occasion: "Formal / Office",
    },

    reviewsData: [],
  },

  {
    id: 1303,
    slug: "black-formal-blazer-1303",
    title: "Classic Black Blazer",
    brand: "Van Heusen",

    price: 6999,
    oldPrice: 10999,
    discount: 36,

    createdAt: "2025-02-23",

    description: "Timeless black blazer for formal and semi-formal occasions.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Blazer",
    },

    seller: "Van Heusen India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    ],

    sizes: ["38", "40", "42", "44"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Poly Viscose",
      fit: "Slim Fit",
      occasion: "Formal / Party",
    },

    reviewsData: [],
  },

  {
    id: 1304,
    slug: "navy-formal-blazer-1304",
    title: "Navy Blue Formal Blazer",
    brand: "Arrow",

    price: 6499,
    oldPrice: 9999,
    discount: 35,

    createdAt: "2025-02-24",

    description: "Sharp navy blazer crafted for boardroom and events.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Blazer",
    },

    seller: "Arrow India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    ],

    sizes: ["38", "40", "42"],

    colors: [{ name: "Navy Blue", hex: "#1e3a8a" }],

    specifications: {
      fabric: "Poly Wool",
      fit: "Regular Fit",
      occasion: "Formal / Office",
    },

    reviewsData: [],
  },

  {
    id: 1305,
    slug: "white-formal-shirt-1305",
    title: "Premium White Formal Shirt",
    brand: "Peter England",

    price: 1899,
    oldPrice: 2999,
    discount: 37,

    createdAt: "2025-02-25",

    description: "Crisp white formal shirt ideal for daily office wear.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Formal Shirt",
    },

    seller: "Peter England India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["S", "M", "L", "XL", "XXL"],

    colors: [{ name: "White", hex: "#ffffff" }],

    specifications: {
      fabric: "100% Cotton",
      fit: "Slim Fit",
      sleeve: "Full Sleeve",
      occasion: "Office / Formal",
    },

    reviewsData: [],
  },

  {
    id: 1306,
    slug: "light-blue-formal-shirt-1306",
    title: "Light Blue Formal Shirt",
    brand: "Louis Philippe",

    price: 2099,
    oldPrice: 3499,
    discount: 40,

    createdAt: "2025-02-26",

    description: "Sophisticated light blue shirt for professional styling.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Formal Shirt",
    },

    seller: "Louis Philippe India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Sky Blue", hex: "#7dd3fc" }],

    specifications: {
      fabric: "Cotton Blend",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
      occasion: "Formal",
    },

    reviewsData: [],
  },

  {
    id: 1307,
    slug: "black-formal-trousers-1307",
    title: "Classic Black Formal Pants",
    brand: "Van Heusen",

    price: 2799,
    oldPrice: 4499,
    discount: 38,

    createdAt: "2025-02-27",

    description: "Tailored black formal trousers with premium fabric.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Formal Pants",
    },

    seller: "Van Heusen India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["30", "32", "34", "36", "38"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Poly Viscose",
      fit: "Slim Fit",
      occasion: "Office / Formal",
    },

    reviewsData: [],
  },

  {
    id: 1308,
    slug: "charcoal-formal-pants-1308",
    title: "Charcoal Grey Formal Pants",
    brand: "Arrow",

    price: 2599,
    oldPrice: 4199,
    discount: 38,

    createdAt: "2025-02-28",

    description:
      "Comfort-fit charcoal formal trousers for everyday office wear.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Formal Pants",
    },

    seller: "Arrow India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["30", "32", "34", "36"],

    colors: [{ name: "Charcoal Grey", hex: "#374151" }],

    specifications: {
      fabric: "Poly Wool",
      fit: "Regular Fit",
      occasion: "Formal",
    },

    reviewsData: [],
  },

  {
    id: 1309,
    slug: "beige-formal-pants-1309",
    title: "Beige Formal Pants",
    brand: "Marks & Spencer",

    price: 2999,
    oldPrice: 4899,
    discount: 39,

    createdAt: "2025-03-01",

    description:
      "Elegant beige formal trousers suitable for office and meetings.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Formal Pants",
    },

    seller: "Marks & Spencer India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["30", "32", "34", "36"],

    colors: [{ name: "Beige", hex: "#f5f5dc" }],

    specifications: {
      fabric: "Cotton Blend",
      fit: "Regular Fit",
      occasion: "Formal",
    },

    reviewsData: [],
  },

  {
    id: 1310,
    slug: "grey-check-formal-suit-1310",
    title: "Grey Check Formal Suit",
    brand: "Blackberrys",

    price: 14999,
    oldPrice: 23999,
    discount: 38,

    createdAt: "2025-03-02",

    description: "Premium grey check formal suit for statement business looks.",

    category: {
      gender: "Men",
      type: "Formal",
      subtype: "Suit",
    },

    seller: "Blackberrys India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1593032465171-cf63f5e7a53f",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["38", "40", "42", "44"],

    colors: [{ name: "Grey Check", hex: "#6b7280" }],

    specifications: {
      fabric: "Poly Wool",
      fit: "Tailored Fit",
      occasion: "Formal / Events",
    },

    reviewsData: [],
  },

  {
    id: 1401,
    slug: "black-leather-jacket-1401",
    title: "Genuine Black Leather Jacket",
    brand: "Roadster",

    price: 8999,
    oldPrice: 14999,
    discount: 40,

    createdAt: "2025-03-05",

    description: "Premium genuine leather jacket with a rugged modern design.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Leather Jacket",
    },

    seller: "Roadster Fashion",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Genuine Leather",
      fit: "Regular Fit",
      occasion: "Casual / Winter",
    },

    reviewsData: [],
  },

  {
    id: 1402,
    slug: "brown-leather-jacket-1402",
    title: "Brown Leather Biker Jacket",
    brand: "Flying Machine",

    price: 8499,
    oldPrice: 13999,
    discount: 39,

    createdAt: "2025-03-06",

    description: "Classic biker-style leather jacket with premium finish.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Leather Jacket",
    },

    seller: "Flying Machine India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Brown", hex: "#7c2d12" }],

    specifications: {
      fabric: "Genuine Leather",
      fit: "Slim Fit",
      occasion: "Casual / Biker Wear",
    },

    reviewsData: [],
  },

  {
    id: 1403,
    slug: "classic-blue-denim-jacket-1403",
    title: "Classic Blue Denim Jacket",
    brand: "Levi's",

    price: 4999,
    oldPrice: 7999,
    discount: 38,

    createdAt: "2025-03-07",

    description: "Iconic blue denim jacket with timeless styling.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Denim Jacket",
    },

    seller: "Levi Strauss India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Blue", hex: "#1d4ed8" }],

    specifications: {
      fabric: "100% Cotton Denim",
      fit: "Regular Fit",
      occasion: "Casual Wear",
    },

    reviewsData: [],
  },

  {
    id: 1404,
    slug: "black-denim-jacket-1404",
    title: "Black Denim Jacket",
    brand: "Wrangler",

    price: 4699,
    oldPrice: 7499,
    discount: 37,

    createdAt: "2025-03-08",

    description: "Modern black denim jacket for everyday styling.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Denim Jacket",
    },

    seller: "Wrangler India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Cotton Denim",
      fit: "Slim Fit",
      occasion: "Casual",
    },

    reviewsData: [],
  },

  {
    id: 1405,
    slug: "grey-hoodie-1405",
    title: "Classic Grey Hoodie",
    brand: "H&M",

    price: 2499,
    oldPrice: 3999,
    discount: 38,

    createdAt: "2025-03-09",

    description: "Soft fleece hoodie with relaxed comfort and modern fit.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Hoodie",
    },

    seller: "H&M India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Grey", hex: "#9ca3af" }],

    specifications: {
      fabric: "Cotton Fleece",
      fit: "Regular Fit",
      occasion: "Casual / Winter",
    },

    reviewsData: [],
  },

  {
    id: 1406,
    slug: "black-hoodie-1406",
    title: "Black Zip-Up Hoodie",
    brand: "Puma",

    price: 2899,
    oldPrice: 4599,
    discount: 37,

    createdAt: "2025-03-10",

    description: "Athletic-inspired zip-up hoodie for everyday comfort.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Hoodie",
    },

    seller: "Puma India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Poly Cotton",
      fit: "Regular Fit",
      occasion: "Sports / Casual",
    },

    reviewsData: [],
  },

  {
    id: 1407,
    slug: "woolen-grey-sweater-1407",
    title: "Wool Blend Grey Sweater",
    brand: "Marks & Spencer",

    price: 3499,
    oldPrice: 5799,
    discount: 40,

    createdAt: "2025-03-11",

    description: "Warm wool-blend sweater designed for winter layering.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Sweater",
    },

    seller: "Marks & Spencer India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Grey", hex: "#6b7280" }],

    specifications: {
      fabric: "Wool Blend",
      fit: "Regular Fit",
      occasion: "Winter Wear",
    },

    reviewsData: [],
  },

  {
    id: 1408,
    slug: "navy-blue-sweater-1408",
    title: "Navy Blue Knit Sweater",
    brand: "U.S. Polo Assn.",

    price: 3299,
    oldPrice: 5499,
    discount: 40,

    createdAt: "2025-03-12",

    description: "Soft knit sweater with classic navy blue tone.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Sweater",
    },

    seller: "US Polo India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      "https://images.unsplash.com/photo-1602810319428-019690571b5b",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    ],

    sizes: ["M", "L", "XL"],

    colors: [{ name: "Navy Blue", hex: "#1e3a8a" }],

    specifications: {
      fabric: "Acrylic Blend",
      fit: "Regular Fit",
      occasion: "Casual / Winter",
    },

    reviewsData: [],
  },

  {
    id: 1409,
    slug: "olive-hooded-jacket-1409",
    title: "Olive Hooded Jacket",
    brand: "HRX",

    price: 3999,
    oldPrice: 6499,
    discount: 38,

    createdAt: "2025-03-13",

    description: "Lightweight hooded jacket for all-season layering.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Hooded Jacket",
    },

    seller: "HRX India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    ],

    sizes: ["S", "M", "L", "XL"],

    colors: [{ name: "Olive", hex: "#4d7c0f" }],

    specifications: {
      fabric: "Polyester",
      fit: "Regular Fit",
      occasion: "Casual / Outdoor",
    },

    reviewsData: [],
  },

  {
    id: 1410,
    slug: "black-puffer-jacket-1410",
    title: "Black Puffer Jacket",
    brand: "Nike",

    price: 5999,
    oldPrice: 9999,
    discount: 40,

    createdAt: "2025-03-14",

    description: "Insulated puffer jacket providing warmth without bulk.",

    category: {
      gender: "Men",
      type: "Outerwear",
      subtype: "Puffer Jacket",
    },

    seller: "Nike India",
    country: "India",

    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    ],

    sizes: ["M", "L", "XL", "XXL"],

    colors: [{ name: "Black", hex: "#000000" }],

    specifications: {
      fabric: "Nylon",
      fit: "Regular Fit",
      occasion: "Winter / Outdoor",
    },

    reviewsData: [],
  },
];
