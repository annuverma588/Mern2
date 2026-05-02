import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid.jsx' // ✅ FIXED
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection' // ✅ ADD THIS

const placeholderProducts = [
  {
    id: 5,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=3" }]
  },
  {
    id: 6,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=4" }]
  },
  {
    id: 7,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=5" }]
  },
  {
    id: 8,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=6" }]
  },
  {
    id: 9,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=3" }]
  },
  {
    id: 10,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=4" }]
  },
  {
    id: 11,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=5" }]
  },
  {
    id: 12,
    name: "Product 1",
    price: 100,
    image: [{ url: "https://picsum.photos/500/500?random=6" }]
  }
]

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Sellers */}
      <h2 className='text-3xl text-center font-bold mb-4'>
        Best Sellers
      </h2>
      <ProductDetails />

      {/* Top Wears */}
      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>

      <FeaturedCollection />
      <FeaturesSection /> {/* ✅ NOW WORKS */}
    </div>
  )
}

export default Home