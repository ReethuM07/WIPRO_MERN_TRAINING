import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

import jacket from "../assets/jacket.jpg";
import belt from "../assets/belt.jpg";
import shoes from "../assets/shoes.jpg";
import bag from "../assets/bag.jpg";
import boots from "../assets/boots.jpg";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const images = {
    Jacket: jacket,
    Belt: belt,
    Shoes: shoes,
    Bag: bag,
    Boots: boots,
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Logic
  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Added to cart");
  };

  return (
    <section className="py-14 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        Sale Products
      </h2>

      {/* RESPONSIVE GRID + ANIMATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="group bg-white rounded-2xl shadow p-5 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* IMAGE ZOOM ANIMATION */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={images[p.name]}
                alt={p.name}
                className="h-48 mx-auto mb-3 transition duration-300 group-hover:scale-110"
              />
            </div>

            {/* DETAILS */}
            <p className="text-lg font-semibold">{p.name}</p>
            <p className="text-gray-600">₹{p.price}</p>

            {/* BUTTON ANIMATION */}
            <button
              onClick={() => handleAddToCart(p)}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full transition duration-300 hover:bg-green-600 hover:scale-105 active:scale-95"
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
