import { useEffect, useState } from "react";
import ProductGrid from "../components/Products/ProductGrid";
import { wishlistApi } from "../services/api";

const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wishlistApi
      .list()
      .then((data) => setProducts(data.products || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">My Wishlist</h1>
      {loading ? (
        <p>Loading wishlist...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default WishlistPage;
