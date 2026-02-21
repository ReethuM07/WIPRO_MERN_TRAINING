import PropTypes from "prop-types";

function BookCard({ book, onSelect }) {
  return (
    <div
      className="card p-3 h-100"
      style={{ cursor: "pointer" }}
      onClick={() => onSelect(book)}
    >
      <h5>{book.title}</h5>
      <p className="text-muted">by {book.author}</p>
      <p className="fw-bold">₹{book.price}</p>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BookCard;
