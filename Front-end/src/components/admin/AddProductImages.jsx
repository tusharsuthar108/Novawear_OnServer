import React, { useState, useEffect } from 'react';
import { Upload, X, Save, Image as ImageIcon, Search } from 'lucide-react';

const AddProductImages = ({ productId: initialProductId, onBack }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(initialProductId || null);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      fetchProduct(selectedProductId);
    }
  }, [selectedProductId]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const data = await response.json();
      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('You can only add up to 5 images');
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedProductId) {
      alert('Please select a product');
      return;
    }
    if (images.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setLoading(true);
    try {
      const variantId = product.variants[0]?.variant_id;
      
      for (const image of images) {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('variant_id', variantId);

        await fetch('http://localhost:3000/api/product-images', {
          method: 'POST',
          body: formData
        });
      }

      alert('Images added successfully!');
      setImages([]);
      if (onBack) onBack();
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add Product Images</h1>
              <p className="text-gray-600 mt-1">Select a product and add 4-5 images</p>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
            )}
          </div>

          {/* Product Selection */}
          {!initialProductId && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product
              </label>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select
                value={selectedProductId || ''}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select a product --</option>
                {filteredProducts.map(p => (
                  <option key={p.product_id} value={p.product_id}>
                    {p.name} - {p.brand_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {product && (
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                Selected Product: <span className="text-indigo-600">{product.name}</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Current images: {product.images?.length || 0}
              </p>
            </div>
          )}

          {/* Upload Area */}
          {selectedProductId && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Images (Max 5)
              </label>
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={images.length >= 5}
                />
                <Upload className="text-gray-400 mb-2" size={48} />
                <p className="text-gray-600 font-medium">Click to upload images</p>
                <p className="text-gray-400 text-sm mt-1">{images.length}/5 images selected</p>
              </label>
            </div>
          )}

          {/* Preview Images */}
          {images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Selected Images ({images.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || images.length === 0}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save size={20} />
              {loading ? 'Uploading...' : `Upload ${images.length} Image${images.length > 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductImages;
