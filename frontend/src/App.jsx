import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Layout + Pages
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import Success from "./pages/Success";
import OrderConfimationPage from "./pages/OrderConfimationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderManagement from "./components/Admin/OrderManagement";

// Admin
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />

          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="orders" element={<MyOrdersPage />} />
          <Route path="product/:id" element={<ProductDetails />} />

          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfimationPage />} />
          <Route path="order/:id" element={<OrderDetailsPage />} />
          <Route path="my-orders" element={<MyOrdersPage />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>

        {/* ================= EXTRA ================= */}
        <Route path="/success" element={<Success />} />

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-2xl font-bold">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;