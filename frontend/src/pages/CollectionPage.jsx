import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 👉 Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 👉 Fake API data
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        {
          id: 1,
          name: "Product 1",
          price: 100,
          image: [{ url: "https://picsum.photos/500/500?random=1" }],
        },
        {
          id: 2,
          name: "Product 2",
          price: 120,
          image: [{ url: "https://picsum.photos/500/500?random=2" }],
        },
        {
          id: 3,
          name: "Product 3",
          price: 150,
          image: [{ url: "https://picsum.photos/500/500?random=3" }],
        },
        {
          id: 4,
          name: "Product 4",
          price: 180,
          image: [{ url: "https://picsum.photos/500/500?random=4" }],
        },
      ];
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center m-2 rounded"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      {/* Overlay (mobile) */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
        ></div>
      )}

      {/* Products Section */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">Collections</h2>

        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image[0].url}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />

                <div className="p-3">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600">₹{product.price}</p>

                  <button className="mt-2 w-full bg-black text-white py-1 rounded hover:bg-gray-800">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;