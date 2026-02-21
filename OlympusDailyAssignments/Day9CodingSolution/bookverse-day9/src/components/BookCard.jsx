import PropTypes from "prop-types";

function BookCard({ book, onSelect }) {
  return (
    <div className="card p-3 h-100" onClick={() => onSelect(book)}>
      <h5>{book.title}</h5>
      <p className="text-muted">{book.author}</p>
      <p className="fw-bold">₹{book.price}</p>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BookCard;
