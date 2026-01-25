import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Welcome to My App 🌸</h1>
        <p>
          This is a simple React application with Light and Dark themes
          created using React Hooks.
        </p>

        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>

      <section>
        <h2>✨ Features</h2>
        <ul>
          <li>Light & Dark Theme</li>
          <li>Built using React Hooks</li>
          <li>Clean and simple UI</li>
          <li>Beginner friendly</li>
        </ul>
      </section>

      <footer>
        <p>Made with ❤️ using React</p>
      </footer>
    </div>
  );
}

export default Home;
