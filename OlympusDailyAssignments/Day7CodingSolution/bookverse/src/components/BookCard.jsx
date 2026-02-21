function BookCard({ title, author, price, view }) {
  return (
    <div className="book-card">
      <div>
        <h3>{title}</h3>
        <p>by {author}</p>
      </div>
      <p className="book-price">₹{price}</p>
    </div>
  );
}

export default BookCard;
