import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const addToCart = async (product) => {
    const existing = cart.find(i => i.productId === product.id);

    if (existing) {
      await fetch(`http://localhost:5000/cart/${existing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existing.quantity + 1 })
      });

      setCart(cart.map(i =>
        i.id === existing.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ));
    } else {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      });

      const newItem = await res.json();
      setCart([...cart, newItem]);
    }
  };

  const increaseQty = async (item) => {
    await fetch(`http://localhost:5000/cart/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: item.quantity + 1 })
    });

    setCart(cart.map(i =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    ));
  };

  const decreaseQty = async (item) => {
    if (item.quantity === 1) {
      await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: "DELETE"
      });
      setCart(cart.filter(i => i.id !== item.id));
    } else {
      await fetch(`http://localhost:5000/cart/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: item.quantity - 1 })
      });

      setCart(cart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      ));
    }
  };

  const removeItem = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, {
      method: "DELETE"
    });
    setCart(cart.filter(i => i.id !== id));
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      cartCount,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
