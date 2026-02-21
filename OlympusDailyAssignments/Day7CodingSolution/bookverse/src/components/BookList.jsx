import { useState } from "react";
import BookCard from "./BookCard";
import "../index.css";

function BookList() {
  const books = [
    { id: 1, title: "Atomic", author: "James Clear", price: 399 },
    { id: 2, title: "Rich Dad", author: "Robert Kiyosaki", price: 299 },
    { id: 3, title: "Ikigai", author: "Hector Garcia", price: 349 },
    { id: 4, title: "7 Habits", author: "Stephen Covey", price: 450 },
    { id: 5, title: "Power Habit", author: "Charles Duhigg", price: 380 },
    { id: 6, title: "Thinking", author: "Daniel Kahneman", price: 499 },
    { id: 7, title: "Deep Work", author: "Cal Newport", price: 420 },
    { id: 8, title: "Start Why", author: "Simon Sinek", price: 350 },
    { id: 9, title: "Subtle Art", author: "Mark Manson", price: 399 },
    { id: 10, title: "Sapiens", author: "Yuval Harari", price: 550 },
    { id: 11, title: "Homo Deus", author: "Yuval Harari", price: 520 },
    { id: 12, title: "Alchemist", author: "Paulo Coelho", price: 299 },
    { id: 13, title: "Monk Ferrari", author: "Robin Sharma", price: 350 },
    { id: 14, title: "Babylon", author: "George Clason", price: 280 },
    { id: 15, title: "Win Friends", author: "Dale Carnegie", price: 399 },
    { id: 16, title: "4 Agreements", author: "Don Ruiz", price: 320 },
    { id: 17, title: "Grit", author: "Angela Duckworth", price: 450 },
    { id: 18, title: "Drive", author: "Daniel Pink", price: 400 },
    { id: 19, title: "Lean Startup", author: "Eric Ries", price: 480 },
    { id: 20, title: "Zero One", author: "Peter Thiel", price: 500 },
    { id: 21, title: "Principles", author: "Ray Dalio", price: 550 },
    { id: 22, title: "Educated", author: "Tara Westover", price: 450 },
  ];

  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="book-list">
      <h2>📚 Featured Books</h2>

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="toggle-buttons">
        <button
          className={view === "grid" ? "active" : ""}
          onClick={() => setView("grid")}
        >
          Grid View
        </button>
        <button
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          List View
        </button>
      </div>

      <div className={view === "grid" ? "grid-view" : "list-view"}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            view={view}
          />
        ))}
      </div>
    </div>
  );
}

export default BookList;
