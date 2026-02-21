import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import ProductList from "./components/ProductList";
import WorkoutTracker from "./components/WorkoutTracker";
import OfflineBanner from "./components/OfflineBanner";

export default function App() {
  return (
    <ThemeProvider>
      <OfflineBanner />
      <Navbar />
      <div className="container">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/workout" element={<WorkoutTracker />} />
        </Routes>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
