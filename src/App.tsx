import * as React from "react";
import './App.css';
import Home from './Screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import FirstPage from "./Screens/FirstPage";
import Cart from "./Screens/Cart";
import { CartProvider } from "../src/Components/CartContext";


export default function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<FirstPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
  </Router> 
  </CartProvider>

  );
}
