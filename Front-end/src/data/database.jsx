// ==========================
// MEN CLOTHING DATABASE
// ==========================

// ---------- CATEGORIES ----------
export const categories = [
  // ================= NEW ARRIVALS =================
  {
    id: 100,
    name: "New Arrivals",
    slug: "new-arrivals",
    type: "category",
    isSpecial: true,
    subCategories: [
      {
        id: 110,
        name: "Top Wear",
        slug: "top-wear",
        subCategories: [
          {
            id: 111,
            name: "T-Shirts",
            slug: "tshirts",
            types: [
              { id: 1111, name: "Crew Neck", slug: "crew-neck" },
              { id: 1112, name: "V-Neck", slug: "v-neck" },
            ],
          },
          {
            id: 112,
            name: "Shirts",
            slug: "shirts",
            types: [
              { id: 1121, name: "Casual Shirts", slug: "casual-shirts" },
              { id: 1122, name: "Formal Shirts", slug: "formal-shirts" },
            ],
          },
        ],
      },
      {
        id: 120,
        name: "Outerwear",
        slug: "outerwear",
        subCategories: [
          {
            id: 121,
            name: "Jackets",
            slug: "jackets",
            types: [
              { id: 1211, name: "Denim Jackets", slug: "denim-jackets" },
              { id: 1212, name: "Leather Jackets", slug: "leather-jackets" },
            ],
          },
        ],
      },
    ],
  },

  // ================= BEST SELLERS =================
  {
    id: 200,
    name: "Best Sellers",
    slug: "best-sellers",
    type: "category",
    subCategories: [
      {
        id: 210,
        name: "Top Wear",
        slug: "top-wear",
        subCategories: [
          {
            id: 211,
            name: "T-Shirts",
            slug: "tshirts",
            types: [
              { id: 2111, name: "Oversized", slug: "oversized" },
              { id: 2112, name: "Polo", slug: "polo" },
            ],
          },
          {
            id: 212,
            name: "Shirts",
            slug: "shirts",
            types: [
              { id: 2121, name: "Casual Shirts", slug: "casual-shirts" },
              { id: 2122, name: "Formal Shirts", slug: "formal-shirts" },
            ],
          },
        ],
      },
      {
        id: 220,
        name: "Bottom Wear",
        slug: "bottom-wear",
        subCategories: [
          {
            id: 221,
            name: "Jeans",
            slug: "jeans",
            types: [
              { id: 2211, name: "Slim Fit", slug: "slim-fit" },
              { id: 2212, name: "Regular Fit", slug: "regular-fit" },
            ],
          },
        ],
      },
    ],
  },

  // ================= MEN (MASTER CATEGORY) =================
  {
    id: 1,
    name: "Men",
    slug: "men",
    type: "category",
    subCategories: [
      {
        id: 10,
        name: "Top Wear",
        slug: "top-wear",
        subCategories: [
          {
            id: 11,
            name: "T-Shirts",
            slug: "tshirts",
            types: [
              { id: 111, name: "Crew Neck", slug: "crew-neck" },
              { id: 112, name: "V-Neck", slug: "v-neck" },
              { id: 113, name: "Oversized", slug: "oversized" },
              { id: 114, name: "Polo", slug: "polo" },
            ],
          },
          {
            id: 12,
            name: "Shirts",
            slug: "shirts",
            types: [
              { id: 121, name: "Casual Shirts", slug: "casual-shirts" },
              { id: 122, name: "Formal Shirts", slug: "formal-shirts" },
            ],
          },
        ],
      },
      {
        id: 20,
        name: "Bottom Wear",
        slug: "bottom-wear",
        subCategories: [
          {
            id: 21,
            name: "Jeans",
            slug: "jeans",
            types: [
              { id: 211, name: "Slim Fit", slug: "slim-fit" },
              { id: 212, name: "Regular Fit", slug: "regular-fit" },
            ],
          },
          {
            id: 22,
            name: "Trousers",
            slug: "trousers",
            types: [
              { id: 221, name: "Formal Trousers", slug: "formal-trousers" },
              { id: 222, name: "Chinos", slug: "chinos" },
            ],
          },
        ],
      },
      {
        id: 30,
        name: "Outerwear",
        slug: "outerwear",
        subCategories: [
          {
            id: 31,
            name: "Jackets",
            slug: "jackets",
            types: [
              { id: 311, name: "Denim Jackets", slug: "denim-jackets" },
              { id: 312, name: "Leather Jackets", slug: "leather-jackets" },
            ],
          },
        ],
      },
      {
        id: 40,
        name: "Ethnic Wear",
        slug: "ethnic-wear",
        subCategories: [
          {
            id: 41,
            name: "Kurtas",
            slug: "kurtas",
            types: [
              { id: 411, name: "Cotton Kurtas", slug: "cotton-kurtas" },
              { id: 412, name: "Festive Kurtas", slug: "festive-kurtas" },
            ],
          },
        ],
      },
    ],
  },

  // ================= WOMEN (MASTER CATEGORY) =================
  {
    id: 2,
    name: "Women",
    slug: "women",
    type: "category",
    subCategories: [
      {
        id: 50,
        name: "Bags",
        slug: "bags",
        subCategories: [
          {
            id: 51,
            name: "Handbags",
            slug: "handbags",
            types: [
              { id: 511, name: "Tote Bags", slug: "tote-bags" },
              { id: 512, name: "Shoulder Bags", slug: "shoulder-bags" },
            ],
          },
        ],
      },
      {
        id: 60,
        name: "Footwear",
        slug: "footwear",
        subCategories: [
          {
            id: 61,
            name: "Heels",
            slug: "heels",
            types: [
              { id: 611, name: "High Heels", slug: "high-heels" },
              { id: 612, name: "Wedges", slug: "wedges" },
            ],
          },
        ],
      },
      {
        id: 70,
        name: "Accessories",
        slug: "accessories",
        subCategories: [
          {
            id: 71,
            name: "Jewelry",
            slug: "jewelry",
            types: [
              { id: 711, name: "Necklaces", slug: "necklaces" },
              { id: 712, name: "Earrings", slug: "earrings" },
            ],
          },
        ],
      },
      {
        id: 80,
        name: "Sleepwear",
        slug: "sleepwear",
        subCategories: [
          {
            id: 81,
            name: "Nightwear",
            slug: "nightwear",
            types: [
              { id: 811, name: "Pajamas", slug: "pajamas" },
              { id: 812, name: "Robes", slug: "robes" },
            ],
          },
        ],
      },
    ],
  },
];

export const products = [
  // ================= 1 =================
  {
    id: 1001,
    name: "NovaWear Black Crew Neck T-Shirt",
    brand: "NovaWear",
    category: "men",
    mainCategory: "top-wear",
    subCategory: "tshirts",
    type: "crew-neck",

    price: 999,
    oldPrice: 1499,
    discount: "33% OFF",

    shortDescription: "Premium cotton crew neck t-shirt for daily wear.",
    longDescription:
      "This black crew neck t-shirt is made from 100% cotton fabric, offering comfort, breathability, and durability for everyday use.",

    specifications: {
      fabric: "100% Cotton",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      neck: "Crew Neck",
    },

    availableSizes: ["S", "M", "L", "XL"],
    color: "Black",

    rating: 4.5,
    reviews: [
      {
        user: "Amit",
        rating: 5,
        comment: "Very comfortable and good quality.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d",
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77",
      "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61",
    ],

    badgeType: "trending",

  },

  // ================= 2 =================
  {
    id: 1002,
    name: "NovaWear White Oversized T-Shirt",
    brand: "NovaWear",
    category: "men",
    mainCategory: "top-wear",
    subCategory: "tshirts",
    type: "oversized",

    price: 1099,
    oldPrice: 1699,
    discount: "35% OFF",

    shortDescription: "Trendy oversized t-shirt with relaxed fit.",
    longDescription:
      "Oversized white t-shirt designed for streetwear lovers. Soft fabric with modern style.",

    specifications: {
      fabric: "Cotton Blend",
      fit: "Oversized",
      sleeve: "Half Sleeve",
      neck: "Crew Neck",
    },

    availableSizes: ["M", "L", "XL"],
    color: "White",

    rating: 4.6,
    reviews: [
      {
        user: "Rahul",
        rating: 4,
        comment: "Stylish and comfortable.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1622445275576-721325763afe",
      "https://images.unsplash.com/photo-1622519407650-3df9883f76a4",
      "https://images.unsplash.com/photo-1622445272461-c6580cab8755",
      "https://images.unsplash.com/photo-1622445275047-c9f0c799d29c",
      "https://images.unsplash.com/photo-1622445274639-5e1a4b6b9a00",
    ],

    badgeType: "bestseller",

  },

  // ================= 3 =================
  {
    id: 1003,
    name: "NovaWear Blue Polo T-Shirt",
    brand: "NovaWear",
    category: "men",
    mainCategory: "top-wear",
    subCategory: "tshirts",
    type: "polo",

    price: 1299,
    oldPrice: 1899,
    discount: "32% OFF",

    shortDescription: "Smart casual polo t-shirt.",
    longDescription:
      "Blue polo t-shirt suitable for office casual and outings with premium finish.",

    specifications: {
      fabric: "Cotton",
      fit: "Regular Fit",
      sleeve: "Half Sleeve",
      collar: "Polo",
    },

    availableSizes: ["S", "M", "L"],
    color: "Blue",

    rating: 4.4,
    reviews: [
      {
        user: "Kunal",
        rating: 4,
        comment: "Looks premium.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e",
      "https://images.unsplash.com/photo-1607345366899-a0e8f0fadf3b",
      "https://images.unsplash.com/photo-1607345366855-c2c2e6e4e5e5",
      "https://images.unsplash.com/photo-1607345366777-d1d1d1d1d1d1",
      "https://images.unsplash.com/photo-1607345366666-e2e2e2e2e2e2",
    ],

    badgeType: "new",

  },

  // ================= 4 =================
  {
    id: 1004,
    name: "NovaWear Casual Checked Shirt",
    brand: "NovaWear",
    category: "men",
    mainCategory: "top-wear",
    subCategory: "shirts",
    type: "casual-shirts",

    price: 1899,
    oldPrice: 2699,
    discount: "30% OFF",

    shortDescription: "Casual checked shirt for daily wear.",
    longDescription:
      "Comfortable cotton checked shirt with modern fit for casual occasions.",

    specifications: {
      fabric: "Cotton",
      fit: "Regular Fit",
      sleeve: "Full Sleeve",
    },

    availableSizes: ["M", "L", "XL"],
    color: "Red Check",

    rating: 4.3,
    reviews: [
      {
        user: "Vikas",
        rating: 4,
        comment: "Nice fabric quality.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
      "https://images.unsplash.com/photo-1602810318660-d7d8f2a13d85",
      "https://images.unsplash.com/photo-1602810318524-64d3b6e5e5e5",
      "https://images.unsplash.com/photo-1602810318777-f1f1f1f1f1f1",
      "https://images.unsplash.com/photo-1602810318888-a2a2a2a2a2a2",
    ],

    badgeType: "trending",

  },

  // ================= 5 =================
  {
    id: 1005,
    name: "NovaWear Formal White Shirt",
    brand: "NovaWear",
    category: "men",
    mainCategory: "top-wear",
    subCategory: "shirts",
    type: "formal-shirts",

    price: 1999,
    oldPrice: 2899,
    discount: "31% OFF",

    shortDescription: "Classic formal shirt for office wear.",
    longDescription:
      "White formal shirt tailored for a sharp professional look.",

    specifications: {
      fabric: "Cotton Blend",
      fit: "Slim Fit",
      sleeve: "Full Sleeve",
    },

    availableSizes: ["M", "L", "XL"],
    color: "White",

    rating: 4.5,
    reviews: [
      {
        user: "Manish",
        rating: 5,
        comment: "Perfect office wear.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1598032895397-b9c644e8c8e5",
      "https://images.unsplash.com/photo-1598032895555-c1c1c1c1c1c1",
      "https://images.unsplash.com/photo-1598032895666-d2d2d2d2d2d2",
      "https://images.unsplash.com/photo-1598032895777-e3e3e3e3e3e3",
      "https://images.unsplash.com/photo-1598032895888-f4f4f4f4f4f4",
    ],

    badgeType: "trending",

  },

  // ================= 6 =================
  {
    id: 1006,
    name: "NovaWear Slim Fit Blue Jeans",
    brand: "NovaWear",
    category: "men",
    mainCategory: "bottom-wear",
    subCategory: "jeans",
    type: "slim-fit",

    price: 2499,
    oldPrice: 3499,
    discount: "28% OFF",

    shortDescription: "Slim fit stretchable denim jeans.",
    longDescription:
      "Blue denim jeans with stretch fabric for all-day comfort.",

    specifications: {
      fabric: "Denim",
      fit: "Slim Fit",
      rise: "Mid Rise",
    },

    availableSizes: ["30", "32", "34", "36"],
    color: "Blue",

    rating: 4.6,
    reviews: [
      {
        user: "Ankit",
        rating: 5,
        comment: "Perfect fit.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390",
    ],

    badgeType: "bestseller",

  },

  // ================= 7 =================
  {
    id: 1007,
    name: "NovaWear Regular Fit Black Jeans",
    brand: "NovaWear",
    category: "men",
    mainCategory: "bottom-wear",
    subCategory: "jeans",
    type: "regular-fit",

    price: 2399,
    oldPrice: 3299,
    discount: "27% OFF",

    shortDescription: "Comfortable regular fit jeans.",
    longDescription:
      "Black jeans with durable stitching and classic fit.",

    specifications: {
      fabric: "Denim",
      fit: "Regular Fit",
    },

    availableSizes: ["30", "32", "34"],
    color: "Black",

    rating: 4.4,
    reviews: [
      {
        user: "Rohit",
        rating: 4,
        comment: "Good quality.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1565084888279-aca607ecce0c",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
      "https://images.unsplash.com/photo-1624378440070-5d2b47f73c00",
      "https://images.unsplash.com/photo-1624378440155-c3c3c3c3c3c3",
      "https://images.unsplash.com/photo-1624378440266-d4d4d4d4d4d4",
    ],

    badgeType: "trending",

  },

  // ================= 8 =================
  {
    id: 1008,
    name: "NovaWear Casual Chinos",
    brand: "NovaWear",
    category: "men",
    mainCategory: "bottom-wear",
    subCategory: "trousers",
    type: "chinos",

    price: 2199,
    oldPrice: 2999,
    discount: "27% OFF",

    shortDescription: "Stylish chinos for smart casual wear.",
    longDescription:
      "Chinos designed with soft fabric and modern fit.",

    specifications: {
      fabric: "Cotton",
      fit: "Slim Fit",
    },

    availableSizes: ["30", "32", "34"],
    color: "Beige",

    rating: 4.5,
    reviews: [
      {
        user: "Suresh",
        rating: 5,
        comment: "Looks premium.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1473691955023-da1c49c95c78",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    ],

    badgeType: "trending",

  },

  // ================= 9 =================
  {
    id: 1009,
    name: "NovaWear Denim Jacket",
    brand: "NovaWear",
    category: "men",
    mainCategory: "outerwear",
    subCategory: "jackets",
    type: "denim-jackets",

    price: 3999,
    oldPrice: 5499,
    discount: "27% OFF",

    shortDescription: "Classic denim jacket.",
    longDescription:
      "Stylish denim jacket suitable for all seasons.",

    specifications: {
      fabric: "Denim",
      fit: "Regular Fit",
    },

    availableSizes: ["M", "L", "XL"],
    color: "Blue",

    rating: 4.7,
    reviews: [
      {
        user: "Nikhil",
        rating: 5,
        comment: "Very stylish.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614",
    ],

    badgeType: "new",

  },

  // ================= 10 =================
  {
    id: 1010,
    name: "NovaWear Cotton Kurta",
    brand: "NovaWear",
    category: "men",
    mainCategory: "ethnic-wear",
    subCategory: "kurtas",
    type: "cotton-kurtas",

    price: 2199,
    oldPrice: 2999,
    discount: "26% OFF",

    shortDescription: "Traditional cotton kurta.",
    longDescription:
      "Elegant cotton kurta suitable for festive occasions.",

    specifications: {
      fabric: "Cotton",
      fit: "Regular Fit",
    },

    availableSizes: ["M", "L", "XL"],
    color: "Off White",

    rating: 4.6,
    reviews: [
      {
        user: "Pratik",
        rating: 5,
        comment: "Very comfortable.",
      },
    ],

    stock: true,
    images: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59",
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59",
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59",
    ],

    badgeType: "trending",

  },
];