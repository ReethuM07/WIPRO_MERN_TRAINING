function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-4 bg-white shadow">
      {/* Logo */}
      <h2 className="text-2xl font-bold tracking-wide">
        EZYShop
      </h2>

      {/* Nav Links */}
      <ul className="flex gap-10 text-lg font-semibold">
        <li className="cursor-pointer relative group">
          Home
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full"></span>
        </li>

        <li className="cursor-pointer relative group">
          Shop
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full"></span>
        </li>

        <li className="cursor-pointer relative group">
          Blog
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full"></span>
        </li>

        <li className="cursor-pointer relative group">
          Login
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-500 transition-all group-hover:w-full"></span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;