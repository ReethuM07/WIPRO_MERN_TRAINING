import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import BookStore from "./flux/BookStore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const bookStore = new BookStore(); // Dependency Injection

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App bookStore={bookStore} />
  </BrowserRouter>
);
