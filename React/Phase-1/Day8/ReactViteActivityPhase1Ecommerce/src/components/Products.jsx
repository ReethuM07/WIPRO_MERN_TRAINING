import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

function Products() {
  const addToCart = (product) => {
    alert(`${product} added to cart`);
  };

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Sale Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">

        <div className="p-4 shadow rounded text-center overflow-hidden group">
          <img
            src={p1}
            alt="Jacket"
            className="h-44 w-full object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
          />
          <p className="font-medium">Jacket</p>
          <button
            onClick={() => addToCart("Jacket")}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>

        <div className="p-4 shadow rounded text-center overflow-hidden group">
          <img
            src={p2}
            alt="Belt"
            className="h-44 w-full object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
          />
          <p className="font-medium">Belt</p>
          <button
            onClick={() => addToCart("Belt")}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>

        <div className="p-4 shadow rounded text-center overflow-hidden group">
          <img
            src={p3}
            alt="Shoes"
            className="h-44 w-full object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
          />
          <p className="font-medium">Shoes</p>
          <button
            onClick={() => addToCart("Shoes")}
            className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>

      </div>
    </section>
  );
}

export default Products;