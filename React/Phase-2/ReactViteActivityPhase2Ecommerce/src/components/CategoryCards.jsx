import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import boots from "../assets/boots.jpg";
import jacket from "../assets/jacket.jpg";
import bags from "../assets/bag.jpg";

function CategoryCards() {
  const [categories, setCategories] = useState([]);

  // map images to category names
  const images = {
    "Ladies Boots": boots,
    "Leather Jackets": jacket,
    "Bags": bags
  };

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">

        {categories.map(category => (
          <div
            key={category.id}
            className="p-4 shadow rounded text-center overflow-hidden group"
          >
            <img
              src={images[category.name]}
              alt={category.name}
              className="h-56 w-full object-cover rounded mb-2 transition-transform duration-300 group-hover:scale-110"
            />

            <p className="font-medium">{category.name}</p>

            <Link to={`/category/${category.name}`}>
              <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
                View
              </button>
            </Link>
          </div>
        ))}

      </div>
    </section>
  );
}

export default CategoryCards;
