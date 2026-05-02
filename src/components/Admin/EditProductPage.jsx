import React, { useState } from "react";

const EditProductPage = () => {

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collection: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://static.cilory.com/681030-thickbox_default/pink-cotton-poplin-hi-low-casual-long-shirt.jpg",
      },
      {
        url: "https://m.media-amazon.com/images/I/81qKr1Su4gL._AC_UY1100_.jpg",
      },
    ],
  });

  // Common input handler
  const handleChanges = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "countInStock"
          ? Number(value)
          : value,
    }));
  };

  // Sizes & Colors handler (clean way)
  const handleArrayChange = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  // Image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
    }));

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  // Remove image
  const handleRemoveImage = (index) => {
    const updatedImages = productData.images.filter((_, i) => i !== index);

    setProductData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", productData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChanges}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChanges}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChanges}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChanges}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* SKU */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChanges}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Sizes</label>
          <input
            type="text"
            value={productData.sizes.join(",")}
            onChange={(e) => handleArrayChange("sizes", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Colors */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Colors</label>
          <input
            type="text"
            value={productData.colors.join(",")}
            onChange={(e) => handleArrayChange("colors", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Upload */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Upload Images</label>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>

        {/* Image Preview (single clean block) */}
        <div className="mb-6 flex gap-4 flex-wrap">
          {productData.images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.url}
                alt="product"
                className="w-24 h-24 object-cover rounded shadow"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600"
        >
          Update Product
        </button>

      </form>
    </div>
  );
};

export default EditProductPage;