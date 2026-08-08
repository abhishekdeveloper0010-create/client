import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#d8edf8] shadow-md sticky top-0 z-50">
      <div className="w-full px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="pl-8">
            <Link
              to="/"
              className="text-3xl font-bold text-sky-600 whitespace-nowrap"
            >
              Apple Blossom
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-12 text-lg font-medium">
            <Link to="/" className="hover:text-sky-600">
              Home
            </Link>

            <Link to="/shop" className="hover:text-sky-600">
              Products
            </Link>

            <a href="#contact" className="hover:text-sky-600">
              Contact
            </a>
            
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">

            

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-2 text-black hover:text-sky-600"
            >
              <FaShoppingCart />
              Cart
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="bg-sky-600 text-white px-5 py-2 rounded-md hover:bg-sky-700"
            >
              Login
            </Link>
            
            {/* Search */}
            <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">

              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 outline-none"
              />

              <button className="text-grey px-4 py-2 hover:bg-sky-700">
                <FaSearch />
              </button>

            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl pl-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="flex flex-col gap-5 px-6 py-5">

            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Products
            </Link>

            <a href="#contact">Contact</a>

            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>

            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>

            <div className="flex border rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 px-4 py-2 outline-none"
              />

              <button className="bg-sky-600 text-white px-4">
                <FaSearch />
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

export default Header;