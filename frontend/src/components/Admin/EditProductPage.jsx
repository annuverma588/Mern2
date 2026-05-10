import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "../../services/api";

const emptyProduct = {
  name: "",
  description: "",
  price: 0,
  discountPrice: 0,
  countInStock: 0,
  sku: "",
  category: "",
  brand: "",
  sizes: [],
  colors: [],
  collection: "",
  material: "",
  gender: "unisex",
  images: [],
  isPublished: true,
  isFeatured: false,
};

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(emptyProduct);
  const [error, setError] = useState("");
  const isNew = id === "new";

  useEffect(() => {
    if (isNew) return;

    productApi
      .details(id)
      .then((data) => setProductData({ ...emptyProduct, ...data.product }))
      .catch((err) => setError(err.message));
  }, [id, isNew]);

  const handleChanges = (event) => {
    const { name, value, type, checked } = event.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : ["price", "discountPrice", "countInStock"].includes(name)
            ? Number(value)
            : value,
    }));
  };

  const handleArrayChange = (field, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const handleImageUrls = (value) => {
    setProductData((prev) => ({
      ...prev,
      images: value
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url) => ({ url, alt: prev.name })),
    }));
  };

  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (isNew) {
        await productApi.create(productData);
      } else {
        await productApi.update(id, productData);
      }
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-6 text-3xl font-bold">
        {isNew ? "Create Product" : "Edit Product"}
      </h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChanges}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChanges}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChanges}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={productData.discountPrice || 0}
              onChange={handleChanges}
              className="w-full rounded border p-2"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block font-semibold">Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChanges}
              className="w-full rounded border p-2"
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChanges}
              className="w-full rounded border p-2"
              required
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleChanges}
            className="rounded border p-2"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={productData.brand}
            onChange={handleChanges}
            className="rounded border p-2"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Sizes, comma separated"
            value={productData.sizes.join(", ")}
            onChange={(event) => handleArrayChange("sizes", event.target.value)}
            className="rounded border p-2"
            required
          />
          <input
            type="text"
            placeholder="Colors, comma separated"
            value={productData.colors.join(", ")}
            onChange={(event) => handleArrayChange("colors", event.target.value)}
            className="rounded border p-2"
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="collection"
            placeholder="Collection"
            value={productData.collection}
            onChange={handleChanges}
            className="rounded border p-2"
          />
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChanges}
            className="rounded border p-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-2 block font-semibold">Image URLs</label>
          <textarea
            value={productData.images.map((image) => image.url).join("\n")}
            onChange={(event) => handleImageUrls(event.target.value)}
            className="h-28 w-full rounded border p-2"
            placeholder="One image URL per line"
            required
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          {productData.images.map((img, index) => (
            <div key={img.url} className="relative">
              <img
                src={img.url}
                alt="product"
                className="h-24 w-24 rounded object-cover shadow"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute right-0 top-0 rounded bg-red-500 px-1 text-xs text-white"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div className="mb-6 flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublished"
              checked={productData.isPublished}
              onChange={handleChanges}
            />
            Published
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={handleChanges}
            />
            Featured
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-green-700 py-2 text-white hover:bg-green-600"
        >
          {isNew ? "Create Product" : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
