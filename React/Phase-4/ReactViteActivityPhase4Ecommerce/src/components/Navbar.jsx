import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CartStore from "../flux/CartStore";

function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = CartStore.getCart();
      const qty = cart.reduce((s, i) => s + i.quantity, 0);
      setCount(qty);
    };

    updateCount();
    CartStore.addChangeListener(updateCount);
    return () => CartStore.removeChangeListener(updateCount);
  }, []);

  return (
    <nav className="flex justify-between px-10 py-4 shadow bg-[var(--card)] text-[var(--text)] transition">
      <h2 className="font-bold text-xl">EZYShop</h2>

      <div className="flex gap-6 items-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Products</NavLink>

        <NavLink to="/cart" className="relative">
          Cart
          {count > 0 && (
            <span className="ml-1 bg-red-500 text-white text-sm px-2 rounded-full">
              {count}
            </span>
          )}
        </NavLink>

        <NavLink to="/admin">Admin</NavLink>

      </div>
    </nav>
  );
}

export default Navbar;
