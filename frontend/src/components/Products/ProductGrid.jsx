import { Link } from "react-router-dom";

const ProductGrid = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`} className="block">
          <div className="rounded-lg bg-white p-4">
            <div className="mb-4 h-96 w-full">
              <img
                src={product.images?.[0]?.url || product.image?.[0]?.url}
                alt={product.images?.[0]?.alt || product.name}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <h3 className="mb-2 text-sm">{product.name}</h3>
            <p className="text-sm font-medium text-gray-500">
              Rs. {Number(product.discountPrice || product.price).toFixed(2)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
