import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  // fetch cart count from JSON server
  const fetchCartCount = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart");
      const data = await res.json();

      // sum of quantities (or length if no quantity)
      const count = data.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );

      setCartCount(count);
    } catch (err) {
      console.error("Error fetching cart count", err);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const linkClass = ({ isActive }) =>
    `relative ${
      isActive ? "text-blue-500" : ""
    }`;

  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white shadow">
      
      {/* Logo */}
      <h2 className="text-2xl font-bold tracking-wide">
        <NavLink to="/">EZYShop</NavLink>
      </h2>

      {/* Navigation Links */}
      <ul className="flex gap-10 text-lg font-semibold">
        
        <li className="group">
          <NavLink to="/" className={linkClass}>
            Home
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>

        <li className="group">
          <NavLink to="/categories" className={linkClass}>
            Categories
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>

        <li className="group">
          <NavLink to="/shop" className={linkClass}>
            Products
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>

        <li className="group relative">
          <NavLink to="/cart" className={linkClass}>
            Cart
            {cartCount > 0 && (
              <span className="ml-1 text-sm bg-red-500 text-white px-2 rounded-full">
                {cartCount}
              </span>
            )}
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
