import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

function BookList({ books, view, onSelect }) {
  const navigate = useNavigate();

  const handleClick = (book) => {
    onSelect(book); 
    navigate(`/book/${book.id}`, { state: { book } }); // Day 9 routing
  };

  if (view === "list") {
    return (
      <ul className="list-group">
        {books.map((b) => (
          <li
            key={b.id}
            className="list-group-item"
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(b)}
          >
            {b.title} — {b.author} — ₹{b.price}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="row">
      {books.map((b) => (
        <div
          className="col-md-4 mb-3"
          key={b.id}
          onClick={() => handleClick(b)}
          style={{ cursor: "pointer" }}
        >
          <BookCard book={b} />
        </div>
      ))}
    </div>
  );
}

export default BookList;
