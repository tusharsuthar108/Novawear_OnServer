import React from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ id, brand, title, price, mrp, discount, rating, image, reviews, product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const cartProduct = product || {
            product_id: id,
            id: id,
            name: title,
            brand_name: brand,
            price: price,
            images: [image],
            variants: [{ variant_id: 1, price: mrp || price, discount_price: price }]
        };
        addToCart(cartProduct, 'M', 1);
    };

    const handleCardClick = () => {
        navigate(`/product/${id}`);
        window.scrollTo(0, 0);
    };

    return (
        <div onClick={handleCardClick} className="group relative p-2 rounded-2xl transition-all duration-300 shadow-xl hover:bg-white cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
                <img
                    src={image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500"}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold">{rating || "4.0"}</span>
                </div>

                <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500 shadow-sm">
                    <Heart size={18} />
                </button>

                {/* Quick Add Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 transition"
                    >
                        <ShoppingBag size={16} /> Quick Add
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-5 space-y-1 px-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{brand}</p>
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-600 transition truncate">{title}</h3>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                    {price > 0 ? (
                        <>
                            <span className="text-lg font-bold text-gray-900">₹{price?.toLocaleString('en-IN')}</span>
                            {mrp && mrp > price && <span className="text-sm text-gray-400 line-through">₹{mrp?.toLocaleString('en-IN')}</span>}
                            {discount && <span className="text-sm font-bold text-emerald-600">{discount}</span>}
                        </>
                    ) : (
                        <span className="text-sm text-gray-500">Price not available</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
