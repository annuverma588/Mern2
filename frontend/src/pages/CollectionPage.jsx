import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ShortOptions from "../components/Products/ShortOptions";
import { productApi } from "../services/api";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((open) => !open);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams(searchParams);
        if (collection && collection !== "all") params.set("collection", collection);
        if (!params.get("limit")) params.set("limit", "8");
        const data = await productApi.list(`?${params.toString()}`);
        setProducts(data.products || []);
        setPagination({
          page: data.page || 1,
          pages: data.pages || 1,
          total: data.total || 0,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [collection, searchParams]);

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <button
        onClick={toggleSidebar}
        className="m-2 flex items-center justify-center rounded border p-2 lg:hidden"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <FilterSidebar />
      </div>

      {isSidebarOpen && (
        <button
          aria-label="Close filters"
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
        />
      )}

      <div className="flex-1 p-4">
        <h2 className="mb-4 text-2xl font-semibold">All Collections</h2>
        <ShortOptions />

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <>
            <p className="mb-3 text-sm text-gray-500">
              {pagination.total} products found
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="overflow-hidden rounded-lg border shadow transition hover:shadow-lg"
                >
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-3">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-gray-600">Rs. {product.price}</p>
                    <span className="mt-2 block w-full rounded bg-black py-1 text-center text-white hover:bg-gray-800">
                      View Details
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {pagination.pages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: pagination.pages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      className={`rounded border px-3 py-1 ${
                        pagination.page === page
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
