import { useParams } from "react-router-dom";
import { products } from "../data/database";
import ProductDetails from "../components/ProductDetails";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

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