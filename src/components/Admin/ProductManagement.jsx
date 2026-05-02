import React from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {

  const products = [
    {
      _id: 1,
      name: "Casual Shirt",
      price: 999,
      sku: "SKU001",
    },
    {
      _id: 2,
      name: "Denim Jeans",
      price: 1499,
      sku: "SKU002",
    },
    {
      _id: 3,
      name: "Leather Jacket",
      price: 2999,
      sku: "SKU003",
    },
    {
      _id: 4,
      name: "T-Shirt",
      price: 499,
      sku: "SKU004",
    },
    {
      _id: 5,
      name: "Hoodie",
      price: 1299,
      sku: "SKU005",
    },
    {
      _id: 6,
      name: "Formal Pants",
      price: 1799,
      sku: "SKU006",
    },
    
  {
    _id: 1,
    name: "Slim Fit Blazer",
    price: 2499,
    sku: "SKU101",
  },
  {
    _id: 2,
    name: "Cotton Kurta",
    price: 899,
    sku: "SKU102",
  },
  {
    _id: 3,
    name: "Sports Track Suit",
    price: 1999,
    sku: "SKU103",
  },
  {
    _id: 4,
    name: "Printed Hoodie",
    price: 1399,
    sku: "SKU104",
  },
  {
    _id: 5,
    name: "Denim Shorts",
    price: 799,
    sku: "SKU105",
  },
  {
    _id: 6,
    name: "Wool Sweater",
    price: 1599,
    sku: "SKU106",
  },
   { _id: 7, name: "Checked Shirt", price: 1099, sku: "SKU107" },
  { _id: 8, name: "Cargo Pants", price: 1599, sku: "SKU108" },
  { _id: 9, name: "Polo T-Shirt", price: 699, sku: "SKU109" },
  { _id: 10, name: "Winter Jacket", price: 3499, sku: "SKU110" },
  { _id: 11, name: "Linen Shirt", price: 1199, sku: "SKU111" },
  { _id: 12, name: "Jogger Pants", price: 1299, sku: "SKU112" },
  { _id: 13, name: "Half Sleeve Shirt", price: 899, sku: "SKU113" },
  { _id: 14, name: "Graphic T-Shirt", price: 599, sku: "SKU114" },
  { _id: 15, name: "Denim Jacket", price: 2799, sku: "SKU115" },
  { _id: 16, name: "Track Pants", price: 999, sku: "SKU116" },
  { _id: 17, name: "Formal Shirt", price: 1399, sku: "SKU117" },
  { _id: 18, name: "Sweatshirt", price: 1499, sku: "SKU118" },
  { _id: 19, name: "Chinos", price: 1699, sku: "SKU119" },
  { _id: 20, name: "Oversized T-Shirt", price: 799, sku: "SKU120" },
  { _id: 21, name: "Bomber Jacket", price: 3299, sku: "SKU121" },
  { _id: 22, name: "Thermal Wear", price: 899, sku: "SKU122" },
  { _id: 23, name: "Casual Shorts", price: 699, sku: "SKU123" },
  { _id: 24, name: "Full Sleeve T-Shirt", price: 899, sku: "SKU124" },
  { _id: 25, name: "Blazer Set", price: 3999, sku: "SKU125" },
  { _id: 26, name: "Knitted Sweater", price: 1799, sku: "SKU126" },

  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Product deleted with id:", id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Product Management
      </h2>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    ₹{product.price.toFixed(2)}
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.sku}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-3 px-4 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ProductManagement;