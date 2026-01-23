import { useEffect, useState } from "react";

const CART_URL = "http://localhost:5000/cart";

function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await fetch(CART_URL);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQty = async (item) => {
    await fetch(`${CART_URL}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: item.quantity + 1
      })
    });
    fetchCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity === 1) {
      await fetch(`${CART_URL}/${item.id}`, {
        method: "DELETE"
      });
    } else {
      await fetch(`${CART_URL}/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: item.quantity - 1
        })
      });
    }
    fetchCart();
  };

  const removeItem = async (id) => {
    await fetch(`${CART_URL}/${id}`, {
      method: "DELETE"
    });
    fetchCart();
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p>₹{item.price} × {item.quantity}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => decreaseQty(item)}
              className="px-2 bg-gray-300"
            >
              −
            </button>

            <button
              onClick={() => increaseQty(item)}
              className="px-2 bg-gray-300"
            >
              +
            </button>

            <button
              onClick={() => removeItem(item.id)}
              className="px-3 bg-red-500 text-white"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
