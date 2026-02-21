import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import BookList from "../components/BookList";
import AuthorInfo from "../components/AuthorInfo";
import Status from "../renderprops/Status";
import authorsData from "../data/authorsData";

function Home({ bookStore }) {
  const [apiBooks, setApiBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState(null);

  // 1️⃣ Load backend books (Day-9 logic)
  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then(res => res.json())
      .then(data => {
        setApiBooks(data);

        // 🔑 ALSO merge Flux books on mount
        const fluxBooks = bookStore.getBooks();
        setBooks([...data, ...fluxBooks]);
      });
  }, [bookStore]);

  // 2️⃣ Subscribe to Flux changes (Day-10 extension)
  useEffect(() => {
    bookStore.subscribe(() => {
      const fluxBooks = bookStore.getBooks();
      setBooks(prevApi => [...apiBooks, ...fluxBooks]);
    });
  }, [bookStore, apiBooks]);

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <Status>{() => <h5>Welcome Reader!</h5>}</Status>

      <SearchBox onSearch={setSearch} />

      <div className="mb-3">
        <button
          className={`btn me-2 ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setView("grid")}
        >
          Grid
        </button>
        <button
          className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setView("list")}
        >
          List
        </button>
      </div>

      <BookList
        books={filtered}
        view={view}
        onSelect={(b) => setAuthor(authorsData[b.author])}
      />

      <AuthorInfo author={author} />
    </div>
  );
}

export default Home;
