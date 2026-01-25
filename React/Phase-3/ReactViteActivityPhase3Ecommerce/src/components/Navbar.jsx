import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useCart();

  const linkClass = ({ isActive }) =>
    `relative ${isActive ? "text-blue-500" : ""}`;

  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white shadow">
      <h2 className="text-2xl font-bold">
        <NavLink to="/">EZYShop</NavLink>
      </h2>

      <ul className="flex gap-8 text-lg font-semibold">
        <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/shop" className={linkClass}>Products</NavLink></li>
        <li>
          <NavLink to="/cart" className={linkClass}>
            Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2 rounded-full text-sm">
                {cartCount}
              </span>
            )}
          </NavLink>
        </li>
        <li><NavLink to="/admin" className={linkClass}>Admin</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
