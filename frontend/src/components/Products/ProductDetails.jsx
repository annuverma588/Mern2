import React, { useEffect, useState } from 'react';
import { Toaster, toast } from "sonner";
import ProductGrid from './ProductGrid.jsx';

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish Jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Black", "Brown"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=1",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: [{url: "https://picsum.photos/500/500?random=3"}]
    },
     {
        id: 2,
        name: "Product 1",
        price: 100,
        image: [{url: "https://picsum.photos/500/500?random=4"}]
    },
     {
        id: 3,
        name: "Product 1",
        price: 100,
        image: [{url: "https://picsum.photos/500/500?random=5"}]
    },
     {
        id: 4,
        name: "Product 1",
        price: 100,
        image: [{url: "https://picsum.photos/500/500?random=6"}]
    }
]

const ProductDetails = () => {

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // ✅ FIXED
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, []);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    } else if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size & color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      toast.success(`Added ${selectedSize} / ${selectedColor} 🛒`, {
        duration: 1000,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className='p-6'>
 <Toaster position="top-right" />

      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col md:flex-row'>

          {/* LEFT */}
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
            {selectedProduct.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImage === img.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>

          {/* CENTER */}
          <div className='md:w-1/2'>

            <div className='mb-4'>
              <img
                src={mainImage}
                alt="Main Product"
                className='w-full h-auto object-cover rounded-lg'
              />
            </div>

            <div className='md:hidden flex overflow-x-auto space-x-4 mt-4'>
              {selectedProduct.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.altText}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === img.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img.url)}
                />
              ))}
            </div>

          </div>

          {/* RIGHT */}
          <div className='md:w-1/2 md:ml-10'>

            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
              {selectedProduct.name}
            </h1>

            <p className='text-lg text-gray-600 mb-1 line-through'>
              ${selectedProduct.originalPrice}
            </p>

            <p className='text-xl text-gray-500 mb-2'>
              ${selectedProduct.price}
            </p>

            <p className='text-gray-600 mb-4'>
              {selectedProduct.description}
            </p>

            {/* COLOR */}
            <div className='mb-4'>
              <p className='text-gray-700'>Color:</p>
              {selectedProduct.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border mr-2 ${
                    selectedColor === color
                      ? "border-black border-4"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                ></button>
              ))}
            </div>

            {/* SIZE */}
            <div className='mb-4'>
              <p className='text-gray-700'>Size:</p>
              <div className='flex gap-2 mt-2'>

                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}

              </div>
            </div>

            {/* QUANTITY */}
            <div className='mb-6'>
              <p className='text-gray-700'>Quantity:</p>
              <div className='flex items-center space-x-4 mt-2'>
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className='px-3 py-1 bg-gray-200 rounded'
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className='px-3 py-1 bg-gray-200 rounded'
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleAddCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

          </div>
        </div>
        <div className='mt-20'>
            <h2 className='text-2xl text-center font-medium mb-4'>
                You May Also Like
            </h2>
            <ProductGrid products={similarProducts}/>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;