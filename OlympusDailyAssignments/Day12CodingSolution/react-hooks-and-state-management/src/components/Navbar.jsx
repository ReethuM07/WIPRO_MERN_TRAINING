import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">React App</Link>
        <Link className="nav-link text-light" to="/workout">Workout</Link>
      </div>
    </nav>
  );
}
