import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import ProductGrid from "./ProductGrid.jsx";
import { productApi, wishlistApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [review, setReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const [detailsData, similarData] = await Promise.all([
          productApi.details(id),
          productApi.similar(id).catch(() => ({ products: [] })),
        ]);
        setProduct(detailsData.product);
        setSimilarProducts(similarData.products || []);
        setMainImage(detailsData.product?.images?.[0]?.url || "");
        setSelectedSize("");
        setSelectedColor("");
        setQuantity(1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleQuantityChange = (action) => {
    setQuantity((current) =>
      action === "plus" ? current + 1 : Math.max(current - 1, 1)
    );
  };

  const handleAddCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1500,
      });
      return;
    }

    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartItem = {
      product: product._id,
      name: product.name,
      image: product.images?.[0]?.url,
      price: product.discountPrice || product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    localStorage.setItem("cart", JSON.stringify([...currentCart, cartItem]));
    toast.success("Added to cart", { duration: 1500 });
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to use wishlist");
      return;
    }

    try {
      const data = await wishlistApi.toggle(product._id);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to review this product");
      return;
    }

    try {
      const data = await productApi.review(product._id, review);
      setProduct(data.product);
      setReview({ rating: 5, comment: "" });
      toast.success("Review saved");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <div className="mx-auto max-w-6xl rounded-lg bg-white p-8">
        <div className="flex flex-col md:flex-row">
          <div className="mr-6 hidden flex-col space-y-4 md:flex">
            {product.images?.map((img) => (
              <img
                key={img.url}
                src={img.url}
                alt={img.alt || product.name}
                className={`h-20 w-20 cursor-pointer rounded-lg border-2 object-cover ${
                  mainImage === img.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={product.name}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>

            <div className="mt-4 flex space-x-4 overflow-x-auto md:hidden">
              {product.images?.map((img) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.alt || product.name}
                  className={`h-20 w-20 cursor-pointer rounded-lg border-2 object-cover ${
                    mainImage === img.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img.url)}
                />
              ))}
            </div>
          </div>

          <div className="md:ml-10 md:w-1/2">
            <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
              {product.name}
            </h1>

            {product.discountPrice && (
              <p className="mb-1 text-lg text-gray-600 line-through">
                Rs. {Number(product.price).toFixed(2)}
              </p>
            )}

            <p className="mb-2 text-xl text-gray-500">
              Rs. {Number(product.discountPrice || product.price).toFixed(2)}
            </p>

            <p className="mb-4 text-gray-600">{product.description}</p>

            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              {product.colors?.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={color}
                  onClick={() => setSelectedColor(color)}
                  className={`mr-2 h-8 w-8 rounded-full border ${
                    selectedColor === color
                      ? "border-4 border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>

            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="mt-2 flex gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded border px-4 py-2 ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="mt-2 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleQuantityChange("minus")}
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange("plus")}
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddCart}
              className="w-full rounded bg-black px-6 py-2 text-white hover:bg-gray-900"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleWishlist}
              className="mt-3 w-full rounded border border-black px-6 py-2 text-black hover:bg-gray-100"
            >
              Add / Remove Wishlist
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
            {product.reviews?.length ? (
              <div className="space-y-4">
                {product.reviews.map((item) => (
                  <div key={item._id || `${item.user}-${item.createdAt}`} className="border-b pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="text-sm text-gray-500">{item.rating}/5</span>
                    </div>
                    <p className="text-gray-600">{item.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          <form onSubmit={handleReviewSubmit} className="rounded border p-4">
            <h2 className="mb-4 text-xl font-semibold">Write a Review</h2>
            <select
              value={review.rating}
              onChange={(event) =>
                setReview((current) => ({ ...current, rating: Number(event.target.value) }))
              }
              className="mb-3 w-full rounded border p-2"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} stars
                </option>
              ))}
            </select>
            <textarea
              value={review.comment}
              onChange={(event) =>
                setReview((current) => ({ ...current, comment: event.target.value }))
              }
              className="mb-3 h-24 w-full rounded border p-2"
              placeholder="Share your experience"
              required
            />
            <button className="rounded bg-black px-4 py-2 text-white">
              Submit Review
            </button>
          </form>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-4 text-center text-2xl font-medium">
              You May Also Like
            </h2>
            <ProductGrid products={similarProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
