import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home'; 
import Login from './pages/Login'; 
import Register from './pages/Register';
import Profile from './pages/Profile'; // Future profile page
import CollectionPage from './pages/CollectionPage'; // Future collections page
import MyOrdersPage from './pages/MyOrdersPage'; // Future orders page

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
        </Route>

        {/* Admin Layout (future) */}
        {/* <Route path="/admin" element={<AdminLayout />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default App;