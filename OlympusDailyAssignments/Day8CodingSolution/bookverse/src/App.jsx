import { useState } from "react";
import booksData from "./data/booksData";
import authorsData from "./data/authorsData";
import BookList from "./components/BookList";
import SearchBox from "./components/SearchBox";
import AuthorInfo from "./components/AuthorInfo";

function App() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBook = (book) => {
    setSelectedAuthor(authorsData[book.author]);
  };

  return (
    <div className="container-fluid mt-4">
      <h2>📚 BookVerse</h2>

      <SearchBox onSearch={setSearch} />

      <div className="mb-3">
        <button
          className={`btn me-2 ${
            view === "grid" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("grid")}
        >
          Grid View
        </button>

        <button
          className={`btn ${
            view === "list" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("list")}
        >
          List View
        </button>
      </div>

      <BookList
        books={filteredBooks}
        onSelect={handleSelectBook}
        view={view}
      />

      <AuthorInfo author={selectedAuthor} />
    </div>
  );
}

export default App;
