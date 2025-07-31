"use client";

import { useProducts } from "../../app/hooks/useConvex";

const ProductsClient: React.FC = () => {
  const products = useProducts();

  if (!products) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product: any) => (
        <div key={product._id} className="bg-white rounded-lg shadow-md p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-bold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-4">{product.text}</p>
          {product.details && (
            <p className="text-sm text-gray-500">{product.details}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductsClient;
