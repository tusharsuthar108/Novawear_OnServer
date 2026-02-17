import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ masterCategorySlug, title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [masterCategorySlug]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      const productsData = data.success ? data.data : data;
      
      // Filter products by master category if needed
      setProducts(productsData.slice(0, 8)); // Show first 8 products
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading products...</div>;
  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-3xl font-black uppercase mb-8">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.product_id}
              to={`/product/${product.product_id}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-4xl text-gray-300">{product.name.charAt(0)}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{product.brand_name}</p>
                <p className="text-sm font-bold">${product.price || '0.00'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
