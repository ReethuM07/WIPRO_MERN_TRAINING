import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/home" className="navbar-brand">
        📚 BookVerse
      </Link>
      <Link to="/add" className="btn btn-sm btn-light">
        Add Book
      </Link>
    </nav>
  );
}

export default Navbar;
