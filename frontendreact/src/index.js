import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Front from './Pages/FrontPage/Front.js'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Login from './Pages/LoginPage/login.js';
import Signup from './Pages/SignupPage/Signup.js';
import Home from './Pages/HomePage/Home.js';
import Collection from './Pages/AddCollectionPage/Collection.js';
import Item from './Pages/AddItemsPage/ItemPage.js';
import ContactUs from './Pages/Contact/index.js';
import YourCollection from './Pages/YourCollection/index.js';
import ProtectedRoute from './Component/ProtectedRoute/index.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/collection" element={<ProtectedRoute><Collection/></ProtectedRoute>} />
        <Route path="/additems" element={<ProtectedRoute><Item/></ProtectedRoute>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/yourcollection" element={<ProtectedRoute><YourCollection/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

