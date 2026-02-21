import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

function App() {
  const location = useLocation();

  return (
    <div className="fade-wrapper" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
