import { useEffect, useState } from "react";

import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

const PRODUCTS_URL = "http://localhost:5000/products";
const CART_URL = "http://localhost:5000/cart";

function Products() {
  const [products, setProducts] = useState([]);

  const images = {
    Jacket: p1,
    Belt: p2,
    Shoes: p3
  };

  // Fetch products
  useEffect(() => {
    fetch(PRODUCTS_URL)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // ADD TO CART WITH QUANTITY
  const addToCart = async (product) => {
    const res = await fetch(CART_URL);
    const cartItems = await res.json();

    const existingItem = cartItems.find(
      item => item.productId === product.id
    );

    if (existingItem) {
      // Increase quantity
      await fetch(`${CART_URL}/${existingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: existingItem.quantity + 1
        })
      });
    } else {
      // Add new item
      await fetch(CART_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })
      });
    }

    alert("Added to cart");
  };

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Sale Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {products.map(product => (
          <div
            key={product.id}
            className="p-4 shadow rounded text-center"
          >
            <img
              src={images[product.name]}
              alt={product.name}
              className="h-44 w-full object-contain mb-2"
            />

            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-600">₹{product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
