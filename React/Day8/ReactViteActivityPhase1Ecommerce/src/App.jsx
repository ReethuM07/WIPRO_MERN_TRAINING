import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryCards from "./components/CategoryCards";
import Products from "./components/Products";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <CategoryCards />
      <Products />
      <Footer />
    </div>
  );
}

export default App;
