import {useState} from "react";
import {Link} from "react-router-dom";

function ProductCard({product}) {
  const [favorite, setFavorite] = useState(false);
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5>{product.name}</h5>
        <p>Rs.{product.price}</p>
        <p>{product.category}</p>
        <div className="d-flex justify-content-between mt-3">
          <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
          <button className={`btn ${favorite ? "btn-danger" : "btn-outline-primary"}`}onClick={() => setFavorite(!favorite)}>{favorite ? "Favorited" : "Add to favorite"}</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
