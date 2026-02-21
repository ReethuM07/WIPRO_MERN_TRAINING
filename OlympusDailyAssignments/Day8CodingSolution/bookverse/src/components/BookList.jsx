import BookCard from "./BookCard";

function BookList({ books, onSelect, view }) {
  if (view === "list") {
    return (
      <ul className="list-group">
        {books.map((book) => (
          <li
            key={book.id}
            className="list-group-item"
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(book)}
          >
            <strong>{book.title}</strong> by {book.author} — ₹{book.price}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="row g-3">
      {books.map((book) => (
        <div className="col-md-3" key={book.id}>
          <BookCard book={book} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}

export default BookList;
