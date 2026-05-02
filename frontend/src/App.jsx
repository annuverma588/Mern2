import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Register from './pages/Register';
import Profile from './pages/Profile'; // Future profile page
import CollectionPage from './pages/CollectionPage'; // Future collections page
import MyOrdersPage from './pages/MyOrdersPage'; // Future orders page
import ProductDetails from './components/Products/ProductDetails'; // Future product details page
import Checkout from './components/Cart/Checkout'; // Future checkout page
import Success from "./pages/Success";
import OrderConfimationPage from './pages/OrderConfimationPage'; // Future order confirmation page
import OrderDetailsPage from './pages/OrderDetailsPage'; // Future order details page
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Layout */}
        <Route path="/" element={<UserLayout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} /> {/* Future profile page */}
          <Route path="/collections/:collection" element={<CollectionPage />} /> {/* Future collections page */}
          <Route path="/orders" element={<MyOrdersPage />} /> {/* Future orders page */}
          <Route path="product/:id" element={<ProductDetails />} /> {/* Future product details page */}
         <Route path="/checkout" element={<Checkout />} /> {/* Future checkout page */}
         <Route path="/order-confirmation" element={<OrderConfimationPage />} /> {/* Future order confirmation page */}
        <Route path="orders/:orderId" element={<OrderDetailsPage />} /> {/* Future order details page */} 
        </Route>

        {/* Admin Layout (future) */}
        {/* <Route path="/admin" element={<AdminLayout />} /> */}
<Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;