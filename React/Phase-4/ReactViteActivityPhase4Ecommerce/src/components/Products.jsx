import { useProducts } from "../context/ProductContext";
import { addToCart } from "../flux/CartActions";

import jacket from "../assets/jacket.jpg";
import belt from "../assets/belt.jpg";
import shoes from "../assets/shoes.jpg";
import bag from "../assets/bag.jpg";
import boots from "../assets/boots.jpg";

function Products() {
  const { products } = useProducts();

  const images = {
    Jacket: jacket,
    Belt: belt,
    Shoes: shoes,
    Bag: bag,
    Boots: boots,
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Added to cart");
  };

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-800 transition">
      <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
        Sale Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {products.map(p => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-700 dark:text-white rounded-xl shadow p-5 text-center transform transition hover:-translate-y-2"
          >
            <img src={images[p.name]} className="h-48 mx-auto mb-3" />
            <p className="font-semibold">{p.name}</p>
            <p>₹{p.price}</p>

            <button
              onClick={() => handleAddToCart(p)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition"
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
