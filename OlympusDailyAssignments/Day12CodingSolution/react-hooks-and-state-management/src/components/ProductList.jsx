import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../store/productsSlice";

export default function ProductList() {
  const { items, loading } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="row">
      {items.slice(0, 8).map(p => (
        <div className="col-md-3 mb-4" key={p.id}>
          <div className="card h-100 d-flex flex-column shadow-sm">
            <div className="card-body d-flex flex-column">
              <h6 className="card-title product-title">
                {p.title}
              </h6>

              <p className="fw-bold mb-3">₹ {p.price}</p>

              <button
                className="btn btn-primary mt-auto"
                onClick={() =>
                  dispatch(updateProduct({ ...p, price: p.price + 1 }))
                }
              >
                Increase Price +1
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
