import { useLocation, Link } from "react-router-dom";
import AuthorInfo from "../components/AuthorInfo";
import authorsData from "../data/authorsData";

function BookDetails() {
  const location = useLocation();
  const book = location.state?.book;

  if (!book) {
    return (
      <div className="container mt-4">
        <p>No book data available</p>
        <Link to="/home">Back</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>{book.title}</h3>
      <p className="text-muted">{book.author}</p>
      <p className="fw-bold">₹{book.price}</p>

      <AuthorInfo author={authorsData[book.author]} />

      <Link to="/home" className="btn btn-link mt-3">
        ← Back to Home
      </Link>
    </div>
  );
}

export default BookDetails;
