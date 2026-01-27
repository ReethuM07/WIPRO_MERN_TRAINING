import { useEffect, useState } from "react";
import CartStore from "../flux/CartStore";
import { increaseQty, decreaseQty, removeFromCart } from "../flux/CartActions";

import jacket from "../assets/jacket.jpg";
import belt from "../assets/belt.jpg";
import shoes from "../assets/shoes.jpg";
import bag from "../assets/bag.jpg";
import boots from "../assets/boots.jpg";

const images = {
  Jacket: jacket,
  Belt: belt,
  Shoes: shoes,
  Bag: bag,
  Boots: boots,
};

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      setCart([...CartStore.getCart()]);
    };

    updateCart(); // initial load
    CartStore.addChangeListener(updateCart);

    return () => CartStore.removeChangeListener(updateCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <p className="text-center mt-10">Your cart is empty 🛒</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      {cart.map(item => (
        <div
          key={item.productId}
          className="flex justify-between items-center bg-white shadow p-4 rounded mb-4"
        >
          {/* LEFT: IMAGE + INFO */}
          <div className="flex items-center gap-4">
            <img
              src={images[item.name]}
              alt={item.name}
              className="w-20 h-20 object-contain"
            />

            <div>
              <p className="font-semibold">{item.name}</p>
              <p>₹{item.price}</p>
            </div>
          </div>

          {/* RIGHT: QTY + ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.productId)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              −
            </button>

            <span className="font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQty(item.productId)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div className="mt-6 text-right text-xl font-bold">
        Total: ₹{total}
      </div>
    </div>
  );
}

export default Cart;
