import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3 className="text-danger">{error}</h3>;

  return (
    <div className="container mt-4">
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ₹ {product.price}</p>

      <Link to="/" className="btn btn-secondary">
        Back to Products
      </Link>
    </div>
  );
}

export default ProductDetail;
