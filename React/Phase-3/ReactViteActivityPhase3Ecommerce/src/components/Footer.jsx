import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
      
      <h3 className="font-semibold mb-2">EZYShop</h3>

      <ul className="flex justify-center gap-6 text-sm mb-2">
        <li>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </li>
      </ul>

      <p className="text-xs text-gray-400">
        © 2026 EZYShop
      </p>

    </footer>
  );
}

export default Footer;
