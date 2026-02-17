import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/database";
import ProductDetails from "../components/ProductDetails";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          // Transform database product to match component format
          const dbProduct = data.data;
          const transformedProduct = {
            id: dbProduct.product_id,
            name: dbProduct.name,
            brand: dbProduct.brand_name || 'NovaWear',
            price: parseFloat(dbProduct.variants[0]?.price || 0),
            oldPrice: parseFloat(dbProduct.variants[0]?.price || 0) * 1.3,
            rating: 4.5,
            images: dbProduct.images.map(img => `http://localhost:3000${img}`),
            color: dbProduct.variants[0]?.color_name || 'Black',
            availableSizes: [...new Set(dbProduct.variants.map(v => v.size_name))],
            stock: dbProduct.variants.some(v => v.stock_quantity > 0),
            shortDescription: dbProduct.description || '',
            longDescription: dbProduct.long_description || dbProduct.description || '',
            category: 'clothing',
            mainCategory: 'men',
            subCategory: 'tshirts',
            badgeType: 'trending',
            specifications: {
              material: dbProduct.variants[0]?.fabric_name || 'Cotton',
              fit: 'Regular',
              pattern: dbProduct.variants[0]?.pattern_name || 'Solid',
              sleeve: 'Short Sleeve',
              neckline: 'Round Neck'
            },
            reviews: [
              { user: 'John Doe', rating: 5, comment: 'Great product!' },
              { user: 'Jane Smith', rating: 4, comment: 'Good quality' }
            ]
          };
          setProduct(transformedProduct);
        } else {
          // Fallback to dummy data
          const dummyProduct = products.find(p => p.id === parseInt(id));
          setProduct(dummyProduct);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to dummy data
        const dummyProduct = products.find(p => p.id === parseInt(id));
        setProduct(dummyProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}