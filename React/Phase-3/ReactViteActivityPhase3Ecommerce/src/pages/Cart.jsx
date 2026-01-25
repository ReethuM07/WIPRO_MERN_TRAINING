import { useCart } from "../context/CartContext";

import jacket from "../assets/jacket.jpg";
import belt from "../assets/belt.jpg";
import shoes from "../assets/shoes.jpg";
import bag from "../assets/bag.jpg";
import boots from "../assets/boots.jpg";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem, total } = useCart();

  // map images by product name
  const images = {
    Jacket: jacket,
    Belt: belt,
    Shoes: shoes,
    Bag: bag,
    Boots:boots
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Your Cart
      </h2>

      {cart.length === 0 && (
        <p className="text-center text-gray-500">
          Your cart is empty 🛒
        </p>
      )}

      <div className="space-y-6">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow rounded-xl p-5"
          >
            {/* LEFT: IMAGE + NAME */}
            <div className="flex items-center gap-6">
              <img
                src={images[item.name]}
                alt={item.name}
                className="w-24 h-24 object-contain rounded"
              />

              <div>
                <p className="text-lg font-semibold">
                  {item.name}
                </p>
                <p className="text-gray-600">
                  ₹{item.price}
                </p>
              </div>
            </div>

            {/* RIGHT: QTY + ACTIONS */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQty(item)}
                className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
              >
                −
              </button>

              <span className="text-lg font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item)}
                className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL SECTION */}
      {cart.length > 0 && (
        <div className="mt-10 bg-white shadow-lg rounded-xl p-6 flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            Total Amount
          </h3>

          <p className="text-2xl font-bold text-green-600">
            ₹{total}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
