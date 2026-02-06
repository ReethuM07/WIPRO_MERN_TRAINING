import { useState } from "react";

function InventoryCard(props) {
  const { name, price, category } = props;
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="col-md-12 mb-4">
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Category: {category}</p>
          <p className="card-text fw-bold">₹ {price}</p>

          <button
            className={`btn ${
              favorite ? "btn-danger" : "btn-outline-primary"
            }`}
            onClick={() => setFavorite(!favorite)}
          >
            {favorite ? "❤️ Favorite" : "🤍 Mark Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryCard;
