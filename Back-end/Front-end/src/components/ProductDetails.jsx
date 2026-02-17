import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Minus,
  Plus,
  RotateCcw,
  Truck,
  Heart,
  Share2,
  X,
  Maximize2,
  ShoppingBag,
  Shield,
  Award
} from "lucide-react";
import CardSlider from "./CardSlider";

export default function ProductDetails({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- States ---
  const [selectedSize, setSelectedSize] = useState(product?.availableSizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Calculate review statistics
  const reviewStats = {
    5: product?.reviews?.filter(r => r.rating === 5).length || 0,
    4: product?.reviews?.filter(r => r.rating === 4).length || 0,
    3: product?.reviews?.filter(r => r.rating === 3).length || 0,
    2: product?.reviews?.filter(r => r.rating === 2).length || 0,
    1: product?.reviews?.filter(r => r.rating === 1).length || 0,
  };
  const totalReviews = product?.reviews?.length || 0;
  const displayedReviews = showAllReviews ? product?.reviews : product?.reviews?.slice(0, 3);

  // --- Helpers ---
  const handleNext = () =>
    setFullScreenIndex((prev) => (prev + 1) % product.images.length);
  const handlePrev = () =>
    setFullScreenIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );

  // --- StarRating Component ---
  const StarRating = ({ rating, size = 12 }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? "currentColor" : "none"}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setFullScreenIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullScreenIndex]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* LIGHTBOX MODAL */}
      {fullScreenIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setFullScreenIndex(null)}
        >
          <div className="absolute top-6 right-6 z-[110]">
            <button
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
              onClick={() => setFullScreenIndex(null)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative w-full max-w-4xl flex items-center justify-center gap-4">
            <button
              className="hidden md:flex bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative bg-white rounded-2xl p-6 max-h-[80vh] overflow-hidden">
              <img
                src={product.images[fullScreenIndex]}
                className="max-w-full max-h-full object-contain"
                alt="Product preview"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium">
                {fullScreenIndex + 1} / {product.images.length}
              </div>
            </div>

            <button
              className="hidden md:flex bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="px-10 py-6 pt-24">

      {/* BREADCRUMB - BELOW NAVBAR */}

        <div className="flex items-center gap-3 text-sm text-gray-700 mb-8">
            <button onClick={() => navigate("/")} className="hover:text-black transition-colors font-medium">
              Home
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <button 
              onClick={() => navigate(`/products?category=${product.category}`)} 
              className="capitalize hover:text-black cursor-pointer font-medium transition-colors"
            >
              {product.category}
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <button 
              onClick={() => navigate(`/products?category=${product.category}&mainCategory=${product.mainCategory}`)} 
              className="capitalize hover:text-black cursor-pointer font-medium transition-colors"
            >
              {product.mainCategory}
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <button 
              onClick={() => navigate(`/products?category=${product.category}&mainCategory=${product.mainCategory}&subCategory=${product.subCategory}`)} 
              className="capitalize hover:text-black cursor-pointer font-medium transition-colors"
            >
              {product.subCategory}
            </button>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-black font-bold">{product.name}</span>
          </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          
          {/* PINTEREST AUTO-ADJUST MASONRY - Increased width */}
          <div className="lg:col-span-3 columns-2 gap-2">
            {product.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setFullScreenIndex(i)}
                className="group relative break-inside-avoid mb-2 overflow-hidden bg-gray-50 cursor-zoom-in shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                  <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={32} />
                </div>
                <img
                  src={img}
                  className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                  alt={`${product.name} view ${i + 1}`}
                  loading="lazy"
                />
                
                {/* Image counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
                  {i + 1}/{product.images.length}
                </div>
              </div>
            ))}
          </div>

          {/* ENHANCED PRODUCT INFO - Reduced width */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                      {product.brand}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full border-2 transition-all ${
                      isLiked ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                  <button className="p-3 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
                  <StarRating rating={Math.floor(product.rating)} size={16} />
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                </div>
                <button className="text-gray-600 hover:text-black transition-colors underline">
                  Read {product.reviews.length} reviews
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Save ₹{(product.oldPrice - product.price).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes • Free shipping above ₹999</p>
            </div>

            {/* Description */}
            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">About this product</h3>
              <p className="text-gray-700 leading-relaxed">{product.shortDescription}</p>
            </div>

            {/* Color & Stock */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Color:</span>
                <div className="w-6 h-6 bg-black rounded-full border-2 border-gray-300"></div>
                <span className="font-medium">{product.color}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.stock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {product.stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Select Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 rounded-xl font-semibold transition-all ${
                      selectedSize === size
                        ? "bg-black text-white shadow-lg scale-105"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-200 transition-colors rounded-l-xl"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-200 transition-colors rounded-r-xl"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  Total: <span className="font-semibold text-gray-900">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              {/* Add to Bag and Buy Now buttons on same line */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  disabled={!selectedSize}
                  onClick={() => addToCart(product, selectedSize, quantity)}
                  className="bg-black text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={20} />
                  Add to Bag
                </button>
                <button 
                  disabled={!selectedSize}
                  className="border-2 border-black text-black py-4 rounded-xl font-semibold hover:bg-black hover:text-white transition-colors disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery Check */}
            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
              <h3 className="font-semibold text-gray-900">Check Delivery</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter PIN code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  maxLength={6}
                />
                <button className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                  Check
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Truck size={24} className="mx-auto text-green-600 mb-2" />
                <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-600">Above ₹999</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <RotateCcw size={24} className="mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-600">30 days</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Shield size={24} className="mx-auto text-purple-600 mb-2" />
                <p className="text-sm font-semibold text-gray-900">Authentic</p>
                <p className="text-xs text-gray-600">100% genuine</p>
              </div>
            </div>
          </div>
        </div>

        {/* ENHANCED PRODUCT DETAILS SECTION */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-2 rounded-2xl flex gap-2">
              <button 
                onClick={() => setActiveTab('description')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'description' 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('specifications')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'specifications' 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Specifications
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'description' && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Description</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
                </div>
                <div className="prose prose-lg prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg text-center">
                    {product.longDescription}
                  </p>
                </div>
                
                {/* Key Features */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-blue-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                    <p className="text-sm text-gray-600">Made with finest materials</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-green-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Award Winning</h3>
                    <p className="text-sm text-gray-600">Recognized design excellence</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="text-purple-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Customer Loved</h3>
                    <p className="text-sm text-gray-600">Highly rated by users</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-slate-500 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={key} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-gray-700 font-semibold capitalize text-lg">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional Info */}
                <div className="mt-10 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4 text-center">Care Instructions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Machine wash cold with like colors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Tumble dry low heat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Do not bleach or iron directly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Professional dry clean if needed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ENHANCED REVIEWS SECTION */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Reviews Overview - Expanded */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
              
              {/* Overall Rating */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl text-center border border-yellow-100">
                <div className="text-6xl font-bold text-gray-900 mb-3">{product.rating}</div>
                <StarRating rating={Math.floor(product.rating)} size={24} />
                <p className="text-gray-600 mt-3 text-lg">Based on {totalReviews} reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviewStats[star];
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm font-medium text-gray-700">{star}</span>
                        <Star size={14} fill="currentColor" className="text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Review Summary */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 mb-3">What customers say</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality</span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={4} size={12} />
                      <span className="text-gray-700 font-medium">4.2</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fit</span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={4} size={12} />
                      <span className="text-gray-700 font-medium">4.1</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value</span>
                    <div className="flex items-center gap-1">
                      <StarRating rating={4} size={12} />
                      <span className="text-gray-700 font-medium">4.3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Reviews ({totalReviews})</h3>
                <button className="text-sm text-gray-600 hover:text-black transition-colors border border-gray-300 px-4 py-2 rounded-lg">
                  Write a Review
                </button>
              </div>
              
              {displayedReviews?.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center font-bold text-gray-700">
                      {review.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.user}</h4>
                          <p className="text-xs text-gray-500">Verified Purchase</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} size={16} />
                          <span className="text-sm font-medium text-gray-600">{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                        <span>Helpful (12)</span>
                        <span>•</span>
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Show More Button */}
              {totalReviews > 3 && (
                <div className="text-center pt-6">
                  <button 
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {showAllReviews ? 'Show Less Reviews' : `Show All ${totalReviews} Reviews`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* SIMILAR CATEGORY ITEMS - Outside main container */}
      <CardSlider badgeType={product.badgeType || "trending"} customTitle="You May Also Like" />
    </div>
  );
}