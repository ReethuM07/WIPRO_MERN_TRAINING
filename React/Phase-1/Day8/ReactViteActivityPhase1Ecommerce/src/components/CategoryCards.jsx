import boots from "../assets/boots.jpg";
import jacket from "../assets/jacket.jpg";
import bags from "../assets/bag.jpg";

function CategoryCards() {
  const handleCategoryClick = (category) =>
    alert(`Category selected: ${category}`);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">

        {/* Boots */}
        <div className="p-4 shadow rounded text-center overflow-hidden group">
          <img
            src={boots}
            alt="Ladies Boots"
            className="h-56 w-full object-cover rounded mb-2 transition-transform duration-300 group-hover:scale-110"
          />
          <p className="font-medium">Ladies Boots</p>
          <button
            onClick={() => handleCategoryClick("Ladies Boots")}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            View
          </button>
        </div>

        {/* Jackets */}
        <div className="p-4 shadow rounded text-center overflow-hidden group">
          <img
            src={jacket}
            alt="Leather Jackets"
            className="h-56 w-full object-cover rounded mb-2 transition-transform duration-300 group-hover:scale-110"
          />
          <p className="font-medium">Leather Jackets</p>
          <button
            onClick={() => handleCategoryClick("Leather Jackets")}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            View
          </button>
        </div>

        {/* Bags */}
        <div className="p-4 shadow rounded text-center overflow-hidden group">
          <img
            src={bags}
            alt="Bags"
            className="h-56 w-full object-cover rounded mb-2 transition-transform duration-300 group-hover:scale-110"
          />
          <p className="font-medium">Bags</p>
          <button
            onClick={() => handleCategoryClick("Bags")}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          >
            View
          </button>
        </div>

      </div>
    </section>
  );
}

export default CategoryCards;