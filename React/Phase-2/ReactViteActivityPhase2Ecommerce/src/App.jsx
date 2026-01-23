import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryCards from "./components/CategoryCards";
import Products from "./components/Products";
import Cart from "./pages/Cart";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoryCards />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes> 
      

      <Footer />
    </div>
  );
}

export default App;
